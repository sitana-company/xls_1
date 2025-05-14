import { _xls, _db, _val } from "@netuno/server-types";

const excel = _xls.create()

const fontHeader = excel.font()
fontHeader.setFontHeightInPoints(14)
fontHeader.setColor(excel.color("white"))

const fontTotal = excel.font()
fontTotal.setFontHeightInPoints(14)
fontTotal.setBold(true)

const styleHeader = excel.cellStyle()
styleHeader.setFont(fontHeader)
styleHeader.setFillPattern(_xls.fillPattern("solid-foreground"))
styleHeader.setFillBackgroundColor(_xls.color("black"))
styleHeader.setAlignment(_xls.horizontalAlignment("center"))

const styleData = excel.cellStyle()
styleData.setBorderBottom(_xls.borderStyle("thin"))
styleData.setBorderTop(_xls.borderStyle("thin"))
styleData.setBorderLeft(_xls.borderStyle("thin"))
styleData.setBorderRight(_xls.borderStyle("thin"))

const styleDataNumber = excel.cellStyle()
styleDataNumber.setBorderBottom(_xls.borderStyle("thin"))
styleDataNumber.setBorderTop(_xls.borderStyle("thin"))
styleDataNumber.setBorderLeft(_xls.borderStyle("thin"))
styleDataNumber.setBorderRight(_xls.borderStyle("thin"))
styleDataNumber.setAlignment(_xls.horizontalAlignment("center"))

const style = {
        total: {
                label: (($ = excel.cellStyle()) => {
                        $.setBorderBottom(_xls.borderStyle("thin"))
                        $.setBorderTop(_xls.borderStyle("thin"))
                        $.setBorderLeft(_xls.borderStyle("thin"))
                        $.setBorderRight(_xls.borderStyle("thin"))
                        $.setFont(fontTotal)
                        return $
                })(),
                number: (($ = excel.cellStyle()) => {
                        $.setBorderBottom(_xls.borderStyle("thin"))
                        $.setBorderTop(_xls.borderStyle("thin"))
                        $.setBorderLeft(_xls.borderStyle("thin"))
                        $.setBorderRight(_xls.borderStyle("thin"))
                        $.setAlignment(_xls.horizontalAlignment("center"))
                        $.setFont(fontTotal)
                        return $
                })()
        }
}

const dbItems = _db.query(`
    SELECT
      parque.nome AS parque,
      especie.nome AS especie,
      catalogo.quantidade
    FROM catalogo
      INNER JOIN parque ON catalogo.parque_id = parque.id
      INNER JOIN especie ON catalogo.especie_id = especie.id
`)

const table = _val.list()

table.add(
    _val.list() // HEADER = CABEÇALHO
        .add(
            _val.map()
                .set("value", "Parque")
                .set("style", styleHeader)
        )
        .add(
            _val.map()
                .set("value", "Espécie")
                .set("style", styleHeader)
        )
        .add(
            _val.map()
                .set("value", "Quantidade")
                .set("style", styleHeader)
        )
)

for (const dbItem of dbItems) {
    table.add(
        _val.list() // ROW = LINHA N
            .add(
                _val.map() // COLUMN = COLUNA 1
                    .set("value", dbItem.getString("parque"))
                    .set("style", styleData)
            )
            .add(
                _val.map() // COLUMN = COLUNA 2
                    .set("value", dbItem.getString("especie"))
                    .set("style", styleData)
            )
            .add(
                _val.map() // COLUMN = COLUNA 3
                    .set("value", dbItem.getInt("quantidade"))
                    .set("style", styleDataNumber)
            )
    )
}

table.add(
    _val.list()
        .add(
            _val.map()
                .set("value", "Total")
                .set("style", style.total.label)
        )
        .add(
            _val.map()
                .set("style", styleData)
        )
        .add(
            _val.map()
                .set("formula", `SUM(D4:D${table.size() + 2})`)
                .set("style", style.total.number)
        )
)

excel.addDataTable(2, 1, table)

excel.mergedRegion(table.size() + 1, table.size() + 1, 1, 2)

excel.sheet().autoSizeColumn(1)
excel.sheet().autoSizeColumn(2)
excel.sheet().autoSizeColumn(3)

excel.output("catalogo.xlsx")
