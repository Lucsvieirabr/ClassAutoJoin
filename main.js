async function GetLink() {
    let Data = new Date();
    let Time = Data.getHours() + (Data.getMinutes() / 100)
    if (Data.getDay === 0 || Data.getDay === 6) return ('É final de semana, vai dormir vagabundo !!');
    if (Time < 7.25 || Time > 11.50) return ('Ainda é cedo ou já acabou a sua aula !!');
    if (Time >= 9.05 && Time < 9.20) return ('Tá no recreio Vagabundo, vai fazer oque com o link ?!!');
    let SelectedClass = await document.getElementById('classselect').value;
    let SelectedEstranClass = await document.getElementById('LEselect').value;

    let AllClassJson = await fetch('./class.json')
        .then(response => response.json())
    let AulasDoDia = AllClassJson[SelectedClass].cronograma[Data.getDay() - 1]

    AllClassJson["ClassHour"].forEach((Class) => {
        if (Class.StartTime <= Time && Time < Class.EndTime) {

            if (AulasDoDia[Class.AulaNum] == 'LingEstranLink') return Link = ((AllClassJson[SelectedClass])[AulasDoDia[Class.AulaNum]])[SelectedEstranClass]
            Link = (AllClassJson[SelectedClass])[AulasDoDia[Class.AulaNum]]

        }
    })

    return Link
}


async function openwindow(window) {

    let link = await GetLink()
    if (!link.startsWith('h')) return alert(link)
    let ClassPage = window.open(await GetLink());



}