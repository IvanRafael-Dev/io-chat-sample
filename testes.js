let num = '0';

const sohNumeros = (param) => {
  if (typeof param !== "number") {
    throw new Error("O parâmetro não é um número");
  }
  console.log("O parâmetro é um número");
}


try {
  sohNumeros(num);
} catch (error) {
  console.log(error.message);
} finally {
  if (typeof num == "number") num = 0;
  sohNumeros(num);
  console.log("Fim da operação");
}