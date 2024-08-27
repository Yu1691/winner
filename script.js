let simulationCount = 0;
const winningNumbers = {
    front: [4, 10, 24, 31, 35], // Example winning front numbers
    back: [5, 8] // Example winning back numbers
};

function generateNumbers() {
    const frontNumbers = [];
    const backNumbers = [];

    // 生成前五个号码
    while (frontNumbers.length < 5) {
        const num = Math.floor(Math.random() * 35) + 1;
        if (!frontNumbers.includes(num)) {
            frontNumbers.push(num);
        }
    }
    frontNumbers.sort((a, b) => a - b); // 从小到大排列

    // 生成后两个号码
    while (backNumbers.length < 2) {
        const num = Math.floor(Math.random() * 12) + 1;
        if (!backNumbers.includes(num)) {
            backNumbers.push(num);
        }
    }
    backNumbers.sort((a, b) => a - b); // 从小到大排列

    // 显示号码
    const numbersText = '前区号码: ' + frontNumbers.join(', ') + ' | 后区号码: ' + backNumbers.join(', ');
    document.getElementById('numbers').innerText = numbersText;

    // 记录生成的号码
    simulationCount++;
    const logTable = document.getElementById('log');
    const logEntry = document.createElement('tr');
    const countCell = document.createElement('td');
    const frontNumbersCell = document.createElement('td');
    const backNumbersCell = document.createElement('td');
    countCell.innerText = simulationCount;

    frontNumbersCell.innerHTML = frontNumbers.map(num => {
        return winningNumbers.front.includes(num) ? `<span style="color: red; font-weight: bold;">${num}</span>` : num;
    }).join(' ');

    backNumbersCell.innerHTML = backNumbers.map(num => {
        return winningNumbers.back.includes(num) ? `<span style="color: red; font-weight: bold;">${num}</span>` : num;
    }).join(' ');

    logEntry.appendChild(countCell);
    logEntry.appendChild(frontNumbersCell);
    logEntry.appendChild(backNumbersCell);
    logTable.insertBefore(logEntry, logTable.firstChild); // 插入到表格顶部
    console.log(numbersText);

    // 检查中奖情况
    const matchingFrontNumbers = frontNumbers.filter(num => winningNumbers.front.includes(num)).length;
    const matchingBackNumbers = backNumbers.filter(num => winningNumbers.back.includes(num)).length;
    const totalMatchingNumbers = matchingFrontNumbers + matchingBackNumbers;

    if (totalMatchingNumbers === 3) {
        alert('中奖五块');
    } else if (totalMatchingNumbers === 4) {
        alert('中奖五百');
    } else if (totalMatchingNumbers === 5) {
        alert('中奖五万');
    } else if (totalMatchingNumbers === 6) {
        alert('中奖五十万');
    } else if (totalMatchingNumbers === 7) {
        alert('中奖五百万');
    }
}

function downloadLog() {
    const logTable = document.getElementById('logTable');
    let txtContent = "";
    const rows = logTable.querySelectorAll('tr');
    rows.forEach(row => {
        const cols = row.querySelectorAll('th, td');
        const rowData = Array.from(cols).map(col => col.innerText).join(' ');
        txtContent += rowData + "\r\n";
    });

    const encodedUri = encodeURI("data:text/plain;charset=utf-8," + txtContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'lottery_log.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
