 // Veri setini fetch ile al
 fetch("https://dummyjson.com/products")
 .then(response => response.json())
 .then(data => {
   var products = data.products;

   // Sadece fiyatları al
   var prices = products.map(product => product.price);


   const margin = { top: 20, right: 20, bottom: 30, left: 40 };
   const width = 1500 - margin.left - margin.right;
   const height = 750 - margin.top - margin.bottom;

   const svg = d3.select("body")
     .append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform", `translate(${margin.left}, ${margin.top})`);

   const x = d3.scaleBand()
     .range([0, width])
     .padding(0.1)
     .domain(products.map(d => d.title));

   const y = d3.scaleLinear()
     .range([height, 0])
     .domain([0, d3.max(prices)]);

   svg.append("g")
     .attr("transform", `translate(0, ${height})`)
     .call(d3.axisBottom(x));

   svg.append("g")
     .call(d3.axisLeft(y));

   svg.selectAll(".bar")
     .data(products)
     .enter().append("rect")
     .attr("class", "bar")
     .attr("x", d => x(d.title))
     .attr("width", x.bandwidth())
     .attr("y", d => y(d.price))
     .attr("height", d => height - y(d.price));
 })
 .catch(error => {
   console.error("Hata oluştu:", error);
 });