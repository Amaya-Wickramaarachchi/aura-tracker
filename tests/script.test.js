function addEntry(product) {
    return { product, time: "mock-time" };
  }
  console.log(addEntry("Cleanser").product === "Cleanser" ? "Pass" : "Fail");