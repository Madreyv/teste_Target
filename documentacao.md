# Explicação do Código de Faturamento Diário

## Descrição Geral
Este código exibe o faturamento diário de uma distribuidora em uma tabela HTML, além de calcular o menor, maior valor de faturamento, a média anual e o número de dias em que o faturamento foi superior à média anual. O programa é dividido em três partes principais:

1. Exibir os dados de faturamento em uma tabela.
2. Calcular o faturamento a partir de um array simples.
3. Calcular o faturamento a partir de um objeto com datas e valores.

## Estrutura do Código

### 1. **Array de Faturamento Simples**
O array `faturamentoDiario` guarda os valores de faturamento dos dias do ano. A partir desse array, é possível calcular:
- O menor valor de faturamento.
- O maior valor de faturamento.
- A média de faturamento anual.
- O número de dias com faturamento acima da média.

#### Exemplo do Array:
```javascript
const faturamentoDiario = [
  220, 350, 0, 180, 200
];
```
Neste array, há cinco dias de faturamento, onde 0 indica um dia sem faturamento.

### 2. **Objeto de Faturamento por Data**
Além do array, usamos um objeto chamado faturamentoObjeto que associa os valores de faturamento às suas respectivas datas. Esse formato é mais adequado para exibir em uma tabela.

Exemplo do Objeto:
```javascript
const faturamentoObjeto = {
  "2024-01-01": 1200.00,
  "2024-01-02": 1500.50,
  "2024-01-03": 800.00,
  "2024-01-04": 0.00,  // Feriado ou final de semana
  "2024-01-05": 2000.00
};
```

### 3. **Funções de Cálculo**
O código possui funções para calcular os dados com base nos arrays e objetos de faturamento.

*Função* calcularFaturamento()
Essa função processa o array faturamentoDiario para calcular:

Menor Faturamento: Inicializado como Infinity, é atualizado com o valor mais baixo.
Maior Faturamento: Inicializado como -Infinity, é atualizado com o valor mais alto.
Soma de Faturamento: Soma todos os valores positivos para cálculo da média.
Média Anual: Soma dividida pelo número de dias com faturamento.
Dias Acima da Média: Número de dias cujo faturamento foi superior à média.

```javascript
function calcularFaturamento() {
  let menorFaturamento = Infinity;
  let maiorFaturamento = -Infinity;
  let somaFaturamento = 0;
  let diasComFaturamento = 0;

  faturamentoDiario.forEach(faturamento => {
    if (faturamento > 0) {
      if (faturamento < menorFaturamento) menorFaturamento = faturamento;
      if (faturamento > maiorFaturamento) maiorFaturamento = faturamento;
      somaFaturamento += faturamento;
      diasComFaturamento++;
    }
  });

  let mediaAnual = somaFaturamento / diasComFaturamento;
  let diasAcimaDaMedia = faturamentoDiario.filter(faturamento => faturamento > mediaAnual).length;

  imprimirResultado(menorFaturamento, maiorFaturamento, diasAcimaDaMedia, mediaAnual);
}
```

### 4. Função imprimirResultado()
Esta função exibe os resultados na página, incluindo o menor e maior faturamento, o número de dias com faturamento acima da média e a média anual.

```javascript
function imprimirResultado(menorFaturamento, maiorFaturamento, diasAcimaDaMedia, mediaAnual) {
  const resultadoDiv = document.getElementById('result');
  resultadoDiv.innerHTML = `
    <p><strong>Menor Faturamento:</strong> R$ ${menorFaturamento.toFixed(2)}</p>
    <p><strong>Maior Faturamento:</strong> R$ ${maiorFaturamento.toFixed(2)}</p>
    <p><strong>Dias com Faturamento Acima da Média:</strong> ${diasAcimaDaMedia} dias</p>
    <p><strong>Média Anual:</strong> R$ ${mediaAnual.toFixed(2)}</p>
  `;
}
```
### 5. **Função calcularFaturamentoTabela()**
Essa função processa o objeto faturamentoObjeto para calcular os mesmos dados que a função anterior, mas agora usando os valores contidos no objeto.

```javascript
function calcularFaturamentoTabela() {
  let valores = Object.values(faturamentoObjeto).filter(valor => valor > 0);
  let menorFaturamento = Math.min(...valores);
  let maiorFaturamento = Math.max(...valores);
  let mediaAnual = valores.reduce((a, b) => a + b, 0) / valores.length;
  let diasAcimaDaMedia = valores.filter(valor => valor > mediaAnual).length;

  return { menorFaturamento, maiorFaturamento, mediaAnual, diasAcimaDaMedia };
}
```

### 6. **Função carregarTabela()**
Essa função carrega os dados do objeto faturamentoObjeto e exibe em uma tabela HTML.

```javascript
function carregarTabela() {
  const tabelaBody = document.querySelector("#tabelaFaturamento tbody");
  for (const [dia, valor] of Object.entries(faturamentoObjeto)) {
    let row = tabelaBody.insertRow();
    let cellDia = row.insertCell(0);
    let cellValor = row.insertCell(1);

    cellDia.textContent = dia;
    cellValor.textContent = valor.toFixed(2);
  }
}
```

### 7. **Estrutura HTML**
A página HTML inclui uma tabela para exibir os dados de faturamento e dois botões para calcular e exibir os resultados.