# xls-1

Example of XLS (Excel.xlsx) file generation using the Netuno Platform.

Tutorial video in portuguese:

<a href="http://www.youtube.com/watch?v=nTnoqEpLghQ" target="_blank" title="Exportar dados em Excel.xlsx - Parte 1">
 <img src="https://raw.githubusercontent.com/sitana-company/xls_1/main/docs/video.jpg" alt="Tutorial Video" width="320" height="180" />
</a>

Here are the services source codes:

- [server/services/xls/get.js](server/services/xls/get.js)

Documentation:

- [XLS resource](https://doc.netuno.org/pt/docs/academy/server/services/xls).

## Run the Service and Open the File Automatically

This command uses `entr` to detect code changes.

Each time the code is changed, the file is automatically downloaded and opened.

```shell
find server -type f -name "*.js" \
  | entr sh -c "\\
  curl http://127.0.0.1:9000/services/xls \\
      --output catalogo.xlsx \\
  && open catalogo.xlsx"
```

## Automatic Application Install

```
./netuno app github=sitana-company/xls_1
```

### Running

Start the Netuno Server:

```
./netuno server app=xls_1
```

## From Scratch

Clone this project inside this folder:

- `(Netuno Root directory)/apps/xls_1/`

### Configuration

You'll need to copy the sample configuration, for example:

- `cp config/sample.json config/_development.json`

Modify it as you need to match your environment.

### Running

In the Netuno root directory run:

```
./netuno server app=xls_1
```
