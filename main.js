document.getElementById('classselect').value = localStorage.class || 'a'
document.getElementById('LEselect').value = localStorage.estranclass || 'esp'

function StorageData(Content, KeytoSave, CheckBox, CheckId) {

    if (CheckBox) {
        let InputCheckBox = document.getElementById(CheckId)
        if (InputCheckBox.checked) {
            if (localStorage.KeytoSave) {
                let Array = localStorage.KeytoSave
                JSON.parse(Array)
                Array.push(Content)
                localStorage.setItem(KeytoSave, JSON.stringify(Array))


            } else {
                let Array = [Content]
                console.log(Array)
                localStorage.setItem(KeytoSave, JSON.stringify(Array))


            }
        }

        return
    }
    Content = document.getElementById(Content).value || Content
    localStorage.setItem(KeytoSave, Content)
}

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
    window.open(await GetLink());

}