document.getElementById('classselect').value = localStorage.class || 'a'
document.getElementById('LEselect').value = localStorage.estranclass || 'esp'


if (localStorage.itinerarios) {
    CheckSelectedBox()
}
async function StorageData(Content, KeytoSave, CheckBox, CheckId) {

    // Se eu quiser salvar uma data de um CheckBox (os itinerários..) ele entra...
    if (CheckBox) {

        // Salvando o element do checkbox
        let InputCheckBox = document.getElementById(CheckId)

        //Se ele estiver, ('on') = true, ('off) = false
        if (InputCheckBox.checked) {

            // Se já tiver uma data, ele tem que adicionar essa nova na Array, o false é se é uma nova data.
            if (localStorage[KeytoSave]) return SaveArrayDatas(KeytoSave, Content, false)

            //Ele não tem, então temos que criar toda a base de datas, em newdata = true.
            return SaveArrayDatas(KeytoSave, Content, true)

        }

        // Ele estavá off, ou seja, o usuário quer tirar o itinerário, então chamamos o Remove.
        return RemoveArrayDatas(KeytoSave, Content)
    }
    Content = document.getElementById(Content).value || Content
    localStorage.setItem(KeytoSave, Content)
}

async function GetLink() {
    let Data = new Date();
    let Time = Data.getHours() + (Data.getMinutes() / 100)
    if (Data.getDay() == 0 || Data.getDay() == 6) return ('É final de semana, vai dormir vagabundo, só funciona em horário de aula !!');
    if (Time >= 9.05 && Time < 9.20) return ('Tá no recreio Vagabundo, vai fazer oque com o link ?!!');
    if (Time < 7.25 || Time > 11.50) return GetItinerarioOrAlert(Time, Data.getDay())
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
    window.open(link);

}

function SaveArrayDatas(KeytoSave, Content, NewData) {

    if (NewData) {
        let Array = [Content]
        localStorage.setItem(KeytoSave, JSON.stringify(Array))
        return
    }

    let Array = JSON.parse(localStorage[KeytoSave])
    Array.push(Content)
    localStorage.setItem(KeytoSave, JSON.stringify(Array))

}

function RemoveArrayDatas(KeytoSave, Content) {
    let Array = JSON.parse(localStorage[KeytoSave])
    Array.splice(Array.indexOf(Content), 1);
    localStorage.setItem(KeytoSave, JSON.stringify(Array))
}

function CheckSelectedBox() {
    let Array = JSON.parse(localStorage.itinerarios)
    Array.forEach(function(CheckBoxId) {

        document.getElementById(CheckBoxId).checked = true;
    })
}

async function GetItinerarioOrAlert(time, day) {
    if (!localStorage.itinerarios || localStorage.itinerarios == '[]') return ('Ainda é muito cedo ou já acabou sua aula, este site só funciona no horário de aula!')
    let AllClassJson = await fetch('./class.json')
        .then(response => response.json())
    let ItinerariosJson = AllClassJson['itinerarios']
    let Array = JSON.parse(localStorage.itinerarios)
    let link
    Array.forEach(function(ItineInscrito) {

        if (ItineInscrito == 'LabMusic' && day == 3 && time >= 13.30 && time < 17.35) return "https://meet.google.com/lookup/duki5vi7mn?authuser=0&hs=179"
        if ((ItinerariosJson[ItineInscrito])['start'] <= time && time < (ItinerariosJson[ItineInscrito])['end']) {
            if ((ItinerariosJson[ItineInscrito])['day'] == day) {
                return link = (ItinerariosJson[ItineInscrito])['link']
            }
        }
    })
    if (link == undefined) return ('Ainda é muito cedo ou já acabou sua aula!')
    return link
}