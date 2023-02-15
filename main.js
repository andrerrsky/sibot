const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();

  // Ao abrir o navegador e uma aba, acessa a url abaixo
  await page.goto(
    "https://statusinvest.com.br/fundos-imobiliarios/variacao/ifix"
  );

  // Define o tamanho da tela
  await page.setViewport({ width: 1080, height: 1024 });

  // Espera a lista carregar na tela
  await page.waitForSelector(".list");

  // Executa um querySelector para pegar informações do primeiro item da lista
  const resultado = await page.evaluate(() => {
    const nomeCompleto = document
      .querySelector(".list")
      .querySelectorAll("h4")[0].textContent;

    const codigo = document
      .querySelector(".list")
      .querySelectorAll("span")[0].textContent;

    let variacao = document
      .querySelector(".list")
      .querySelectorAll(".value")[0].textContent;

    // Remove tudo que não for número e virgula de variacao
    variacao = variacao.replace(/[^0-9,]/g, "");

    return {
      nomeCompleto,
      codigo,
      variacao,
    };
  });

  // Imprime no console
  console.log(JSON.stringify(resultado));

  // Outros exemplos:

  // Escreve em um input
  //await page.type("#idDoInput", "texto");

  // Clica em um botão
  //await page.click("#idDoBotao");

  //await browser.close();
})();
