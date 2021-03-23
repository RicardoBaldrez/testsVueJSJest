import Leliao from '@/components/Leilao'
import { mount } from '@vue/test-utils'

const leilao = {
    produto: 'Um livro da casa do código',
    lanceInicial: 49,
    descricao: 'Um maravilhoso livro sobre VUE'
}

describe('Leilão e os dados do produto', () => {
    test('Exibe os dados do leilão no card', () => {
        const wrapper = mount(Leliao, {
            propsData: {
                leilao
            }
        })

        const header = wrapper.find('.card-header').element
        const title = wrapper.find('.card-title').element
        const description = wrapper.find('.card-text').element

        expect(header.textContent).toContain(`Estamos leiloando um(a): ${ leilao.produto }`)
        expect(title.textContent).toContain(`Lance inicial: R$ ${ leilao.lanceInicial }`)
        expect(description.textContent).toContain(leilao.descricao)
    })
})