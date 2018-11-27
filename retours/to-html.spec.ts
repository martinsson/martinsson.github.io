import {expect} from 'chai'
import {toHtml} from "./to-html"

describe('to-html', () => {
    it('tranforms the thing to html', async () => {
        const html = await toHtml(",,,Interet\n" +
            "Karim Sanglan ,Orange,Tu dois le faire,5\n" +
            "Eduardo,Thales,The best workshop I have ever taken in recent years of counseling,5\n")
        expect(html).eq("Tu dois le faire\n<p>Karim Sanglan - Orange</p>\n" +
            "The best workshop I have ever taken in recent years of counseling\n<p>Eduardo - Thales</p>")
    });

});
