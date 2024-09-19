const faturamentoDiario = [
  220,350,0,180,200
]

const faturamentoObjeto = {
  "2024-01-01": 1200.00,
  "2024-01-02": 1500.50,
  "2024-01-03": 800.00,
  "2024-01-04": 0.00, // Feriado ou final de semana
  "2024-01-05": 2000.00,
}

function calcularFaturamento(){
  let menorFaturamento = Infinity;
  let maiorFaturamento = -Infinity;
  let somaFaturamento = 0;
  let diasComFaturamento = 0;

  faturamentoDiario.forEach(faturamento => {
    if(faturamento > 0){
      if(faturamento < menorFaturamento) menorFaturamento = faturamento;
      if(faturamento > maiorFaturamento) maiorFaturamento = faturamento;
      somaFaturamento = somaFaturamento + faturamento;
      diasComFaturamento ++;
    }
  })

  let mediaAnual = somaFaturamento/diasComFaturamento;
  let diasAcimaDaMedia = faturamentoDiario.filter(faturamento => faturamento > mediaAnual).length;
  
  imprimirResultado(menorFaturamento, maiorFaturamento, diasAcimaDaMedia, mediaAnual)
  // const resultadoDiv = document.getElementById('result');
  //   resultadoDiv.innerHTML = `
  //       <p><strong>Menor Faturamento:</strong> R$ ${menorFaturamento.toFixed(2)}</p>
  //       <p><strong>Maior Faturamento:</strong> R$ ${maiorFaturamento.toFixed(2)}</p>
  //       <p><strong>Dias com Faturamento Acima da Média:</strong> ${diasAcimaDaMedia} dias</p>
  //       <p><strong>Média Anual:</strong> R$ ${mediaAnual.toFixed(2)}</p>
  //   `;
}

function imprimirResultado(menorFaturamento, maiorFaturamento, diasAcimaDaMedia, mediaAnual){
  const resultadoDiv = document.getElementById('result');
    resultadoDiv.innerHTML = `
        <p><strong>Menor Faturamento:</strong> R$ ${menorFaturamento.toFixed(2)}</p>
        <p><strong>Maior Faturamento:</strong> R$ ${maiorFaturamento.toFixed(2)}</p>
        <p><strong>Dias com Faturamento Acima da Média:</strong> ${diasAcimaDaMedia} dias</p>
        <p><strong>Média Anual:</strong> R$ ${mediaAnual.toFixed(2)}</p>
    `;
}

function calcularFaturamentoTabela(){
  let valores = Object.values(faturamentoObjeto).filter(valor => valor > 0);
  let menorFaturamento = Math.min(...valores);
  let maiorFaturamento = Math.max(...valores);
  let mediaAnual = valores.reduce((a,b) => a + b, 0)/valores.length;
  let diasAcimaDaMedia = valores.filter(valor => valor > mediaAnual).length;
  return {menorFaturamento, maiorFaturamento, mediaAnual, diasAcimaDaMedia};
}

function exibirDados(){
  const { menorFaturamento, maiorFaturamento, mediaAnual, diasAcimaDaMedia } = calcularFaturamentoTabela();
  
  imprimirResultado(menorFaturamento, maiorFaturamento, diasAcimaDaMedia, mediaAnual)
}

function carregarTabela(){
  const tabelaBody = document.querySelector("#tabelaFaturamento tbody");
  for(const[dia,valor] of Object.entries(faturamentoObjeto)){
    let row = tabelaBody.insertRow();
    let cellDia = row.insertCell(0);
    let cellValor = row.insertCell(1);
  
    cellDia.textContent = dia;
    cellValor.textContent = valor.toFixed(2);
  }
}

