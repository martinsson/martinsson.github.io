import {readFile} from "fs-extra"
import parse from 'csv-parse/lib/sync'

export async function doExport(csvFullPath = __dirname + '/retours-tdd.csv') {
    const csvContent = await readFile(csvFullPath)
    console.log(await toHtml(csvContent.toString()))
}

export async function toHtml(csvContent: string) {
    const lins = parse(csvContent, {columns:true})
    return lins.map((line: any) => {
        const phrase = line.Commentaire.replace("\n", '<br>' )
        const name = line.Nom.trim()
        const company = line.Entreprise
        return "<blockquote>\n" +
            `${phrase}\n<span>${name} - ${company}</span>\n` +
            "</blockquote>"
    }).join('\n')

}
