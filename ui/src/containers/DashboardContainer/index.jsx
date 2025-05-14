import React, { useState, useEffect, useRef } from "react";

import MyButton from "../../components/MyButton";

import "./index.less";

function DashboardContainer() {
  return (
    <div className="my-dashboard">
      <a href="/services/xls" target="_blank">Exportar Catálogo</a>
    </div>
  );
}

export default DashboardContainer;
