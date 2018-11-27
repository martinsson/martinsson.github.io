import {readFile} from "fs-extra"

export async function doExport() {
    const csvContent = await readFile(__dirname + '/retours-tdd.csv')
    console.log(await toHtml(csvContent.toString()))
    // const lines: string[][] = csvContent.toString().split('\n').map(line => line.split(','))

}

export async function toHtml(csvContent: string) {
    // const csvContent = await readFile(__dirname + '/retours-tdd.csv')

    const lines: string[][] = csvContent.toString()
        .split('\n')
        .filter(l => l.length > 0)
        .filter(l => l.indexOf(',,,') === -1)
        .map(line => line.split(','))
    return lines
        .map(line => line.map(element => element.trim()))
        .map(([name, company, phrase]) => {
            return `${phrase}\n<p>${name} - ${company}</p>`
        }).join('\n')
}
