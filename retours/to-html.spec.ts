import {expect} from 'chai'
import {toHtml} from "./to-html"
import parse from 'csv-parse/lib/sync'
import {readFile} from "fs-extra"

describe('to-html', () => {
    it('tranforms the thing to html', async () => {
        const html = await toHtml("Nom,Entreprise,Commentaire,Interet\n" +
            "Karim Sanglan ,Orange,Tu dois le faire,5\n" +
            "Eduardo,Thales,The best workshop I have ever taken in recent years of counseling,5\n")
        expect(html).eq("Tu dois le faire\n<p>Karim Sanglan - Orange</p>\n" +
            "The best workshop I have ever taken in recent years of counseling\n<p>Eduardo - Thales</p>")
    });

    it('handles quotes in csv', async () => {
        let multiLineCsv = "Nom,Entreprise,Commentaire,Interet\n" +
            "Mathieu Chauvin,Orange,\"Que ça vaut le coup...\nJ'aime bien\",4"
        const html = await toHtml(multiLineCsv)

        let parseResult = parse(multiLineCsv, {columns:true})
        expect(parseResult).eql([{ Nom: 'Mathieu Chauvin', Entreprise: 'Orange', Commentaire: 'Que ça vaut le coup...\nJ\'aime bien', Interet: '4' }])
        expect(parseResult.map(line => line.Commentaire)).eql(["Que ça vaut le coup...\nJ\'aime bien"])
        expect(parseResult.map(line => line.Commentaire.replace("\n", ""))).eql(["Que ça vaut le coup...J\'aime bien"])
        expect(html).eql("Que ça vaut le coup...<br>J'aime bien\n" +
            "<p>Mathieu Chauvin - Orange</p>")
    });

    it('parse', () => {
        const lines = parse("Nom,Entreprise,Commentaire,Interet\n" +
            "Karim Sanglan ,Orange,Tu dois le faire,5\n", {columns:true})
        expect(lines).eql([{ Nom: 'Karim Sanglan ',
            Entreprise: 'Orange',
            Commentaire: 'Tu dois le faire',
            Interet: '5' }])
    });

    it('', () => {
        expect("\"toto\ntata\"".replace("\n", "<br>")).eql("\"toto<br>tata\"")
    });


    it('bug in parse csv', () => {
        expect(parse("author,Message\n" +
            "Tolkien,\"To all my friends in middle earth,\n" +
            "I wish you a merry christmas!\"\n" +
            "JK Rowling,\"To all my friends at Hogwarts\n" +
            "I wish you a merry christmas!\"", {columns: true})).eql([
            {author: "Tolkien", Message: "To all my friends in middle earth,\nI wish you a merry christmas!"},
            {author: "JK Rowling", Message: "To all my friends at Hogwarts\nI wish you a merry christmas!"},
        ])
    });
    it('multi-line in file', async () => {
        let csvContent = await readFile(__dirname + "/multi-line.csv")
        expect(await toHtml(csvContent.toString())).eql("Que ça vaut le coup...<br>J'aime bien les choix des katas et la possibilité d'aller plus loin pour les plus rapides\n" +
            "<p>Mathieu Chauvin - Orange</p>")

    });

});
