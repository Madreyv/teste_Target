const faturamentoDiario = [
  220,350,0,180,200
]

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
  const resultadoDiv = document.getElementById('result');
    resultadoDiv.innerHTML = `
        <p><strong>Menor Faturamento:</strong> R$ ${menorFaturamento.toFixed(2)}</p>
        <p><strong>Maior Faturamento:</strong> R$ ${maiorFaturamento.toFixed(2)}</p>
        <p><strong>Dias com Faturamento Acima da Média:</strong> ${diasAcimaDaMedia} dias</p>
        <p><strong>Média Anual:</strong> R$ ${mediaAnual.toFixed(2)}</p>
    `;
}
