async function GetLink() {
    const Data = new Date();
    const Time = Data.getHours() + (Data.getMinutes() / 100)
    if (Data.getDay === 0 || Data.getDay === 6) return ('É final de semana, vai dormir vagabundo !!');
    if (Time < 7.25 || Time > 11.50) return ('Ainda é cedo ou já acabou a sua aula !!');
    if (Time >= 9.05 && Time < 9.20) return ('Tá no recreio Vagabundo, vai fazer oque com o link ?!!');
    const SelectedClass = await document.getElementById('classselect').value;
    let SubjectsLinks = new Object()
    SubjectsLinks.a = {
        HistLink: 'https://meet.google.com/lookup/d2tiva74v6?authuser=0&hs=179',
        MatLink: 'https://meet.google.com/lookup/eet5chxvkt',
        BioLink: 'https://meet.google.com/lookup/aidnilv2my',
        QuiLink: 'https://meet.google.com/lookup/gp4spgnxaw',
        PortLink: 'https://meet.google.com/lookup/gzh5izuxxb',
        FisLink: 'https://meet.google.com/lookup/dedfvgu3od',
        FiloLink: 'https://meet.google.com/lookup/cl22tuuycb',
        GeoLink: 'https://meet.google.com/lookup/d4eg42rpbj',
        EreLink: 'https://meet.google.com/lookup/giigxovike',
        LingEstranLink: 'https://drive.google.com/file/d/1eVD0jccmJTQaXJXnvHUHZxIXWSLfnyFb/view?usp=sharing',
        cronograma: [
            ['HistLink', 'MatLink', 'QuiLink', 'PortLink', 'FisLink'],
            ['FiloLink', 'MatLink', 'GeoLink', 'BioLink', 'PortLink'],
            ['BioLink', 'LingEstranLink', 'QuiLink', 'FisLink', 'MatLink'],
            ['QuiLink', 'FisLink', 'GeoLink', 'MatLink', 'HistLink'],
            ['PortLink', 'PortLink', 'LingEstranLink', 'BioLink', 'EreLink']
        ]
    }

    let CronogramaDeAula = SubjectsLinks[SelectedClass].cronograma
    const AulasDoDia = CronogramaDeAula[Data.getDay() - 1]
    const ClassHour = [{
            AulaNum: 0,
            StartTime: 7.25,
            EndTime: 8.15
        },
        {
            AulaNum: 1,
            StartTime: 8.15,
            EndTime: 9.05
        },
        {
            AulaNum: 2,
            StartTime: 9.20,
            EndTime: 10.10
        },
        {
            AulaNum: 3,
            StartTime: 10.10,
            EndTime: 11.00
        },
        {
            AulaNum: 4,
            StartTime: 11.00,
            EndTime: 11.50
        },

    ];
    ClassHour.forEach((Class) => {
        if (Class.StartTime <= Time && Time < Class.EndTime) {

            let AulaDoDia = AulasDoDia[Class.AulaNum]
            let allLinks = SubjectsLinks[SelectedClass]
            Link = allLinks[AulaDoDia]
        }
    })

    return Link
}



async function openwindow(window) {

    const link = await GetLink()
    if (!link.startsWith('h')) return alert(link)
    let ClassPage = window.open(await GetLink());



}