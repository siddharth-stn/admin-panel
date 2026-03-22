// Dashboard — landing page with an overview of key metrics.
export default function Dashboard() {
  // Stat card data — each object defines a card's value, label, and colors
  const boxArray = [
    {
      textOne: "26",
      textTwo: "Users",
      textColor: "white",
      bgColor: "#5956D3",
    },
    {
      textOne: "$6,200",
      textTwo: "Product",
      textColor: "white",
      bgColor: "#2998FE",
    },
    {
      textOne: "2.49",
      textTwo: "Category",
      textColor: "white",
      bgColor: "#FCB01D",
    },
    {
      textOne: "44",
      textTwo: "Orders",
      textColor: "white",
      bgColor: "#E95353",
    },
  ];

  return (
    <div className="ml-50 mt-8 text-2xl">
      <div className="">
        <h3 className="font-bold ml-2">Dashboard Overview</h3>
      </div>
      {/* Render stat cards in a flex row that wraps on smaller screens */}
      <div className="box-wrapper flex gap-5 flex-wrap mt-6">
        {boxArray.map((v, i) => {
          return (
            <div
              key={i}
              className="box h-50 w-90 rounded-xl p-6 flex flex-col"
              style={{ background: v.bgColor, color: v.textColor }}
            >
              <span className="font-bold">{v.textOne}</span>
              <span className="font-bold">{v.textTwo}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
