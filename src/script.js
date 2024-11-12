// Obter o contexto de renderização para o gráfico no elemento HTML com o id "data-set"
const context = document.getElementById("data-set").getContext("2d");

// Criar um gráfico vazio usando a biblioteca Chart.js
let line = new Chart(context, {});

// Capturar os valores dos campos do formulário (montante inicial, anos, taxas de juros e número de composições)
const intialAmount = document.getElementById("initialamount");
const years = document.getElementById("years");
const rates = document.getElementById("rates");
const compound = document.getElementById("compound");

// Capturar o elemento para exibir a mensagem de resultado
const message = document.getElementById("message");

// Capturar o botão de cálculo
const button = document.querySelector(".input-group button");

// Adicionar um evento Click ao botão para executar a função de cálculo quando clicado
button.addEventListener("click", calculateGrowth);

// Arrays para armazenar os dados do gráfico e os rótulos (anos) para cada ponto
const data = [];
const labels = [];

// Função para calcular o crescimento do montante ao longo dos anos
function calculateGrowth(e) {
    // Prevenir o comportamento padrão do formulário
    e.preventDefault();
    
    // Limpar dados e rótulos de execuções anteriores
    data.length = 0;
    labels.length = 0;
    
    let growth = 0;
    try {
        // Converter os valores dos campos do formulário para inteiros
        const initial = parseInt(intialAmount.value);
        const period = parseInt(years.value);
        const interest = parseInt(rates.value);
        const comp = parseInt(compound.value);

        // Loop para calcular o montante final para cada ano
        for (let i = 1; i <= period; i++) {
            // Fórmula para calcular o montante com juros compostos
            const final = initial * Math.pow(1 + ((interest / 100) / comp), comp * i);
            
            // Adicionar o valor final arredondado ao array de dados e o ano ao array de rótulos
            data.push(toDecimal(final, 2));
            labels.push("Year " + i);
            
            // Atualizar o valor do crescimento para o último ano
            growth = toDecimal(final, 2);
        }
        
        // Exibir a mensagem com o montante final após o período especificado
        message.innerText = `You will reach ${growth} € after ${period} years`;

        // Chamar a função para desenhar o gráfico com os novos dados
        drawGraph();
    } catch (error) {
        // Caso ocorra um erro, exibir no console
        console.error(error);
    }
}

// Função para desenhar o gráfico com os dados calculados
function drawGraph() {
    // Destruir o gráfico anterior para evitar sobreposição de dados
    line.destroy();
    
    // Criar um novo gráfico do tipo linha (line) com os dados atualizados
    line = new Chart(context, {
        type: 'line',
        data: {
            labels, // Rótulos dos anos
            datasets: [{
                label: "compound", // Legenda do gráfico
                data, // Dados do montante para cada ano
                fill: true, // Preencher área abaixo da linha
                backgroundColor: "rgba(12, 141, 0, 0.7)", // Cor de fundo da área preenchida
                borderWidth: 3 // Largura da borda da linha do gráfico
            }]
        }
    });
}

// Função para arredondar um valor decimal para o número de casas decimais especificadas
function toDecimal(value, decimals) {
    return +value.toFixed(decimals); // Retorna o valor arredondado
}
  
