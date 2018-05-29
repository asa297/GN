export default [
  {
    columns: [
      {
        Header: "#",
        accessor: "index",
        width: 30,
        style: { textAlign: "center" }
      },
      {
        Header: "Order Id",
        accessor: "orderId",
        style: { fontWeight: "bold" }
      },
      {
        Header: "Date",
        accessor: "RecordDate_moment",
        style: { textAlign: "center" }
      },
      {
        Header: "Org Name",
        accessor: "orgName",
        width: 500
      },
      {
        Header: "Org Type",
        accessor: "orgTypeName",
        width: 100
      },
      {
        Header: "GroupCode",
        accessor: "groupCode",
        style: { textAlign: "center" }
      },
      {
        Header: "Total",
        accessor: "grandtotal",
        style: { textAlign: "right", fontWeight: "bold" }
      },
      {
        Header: "Credit",
        accessor: "credit",
        style: { textAlign: "right" }
      },
      {
        Header: "Cash",
        accessor: "cash",
        style: { textAlign: "right" }
      },
      {
        Header: "RecordBy",
        accessor: "RecordNameBy",
        style: { textAlign: "center" }
      }
    ]
  }
];
