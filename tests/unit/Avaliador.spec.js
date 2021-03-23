import Avaliador from '@/views/Avaliador'
// RouterLinkStub -> Simulador do router-link 
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leiloes = [
    {
        produto: 'Livro da casa do código',
        lanceInicial: 50,
        descricao: 'Livro sobre VueJs'
    },
    {
        produto: 'Livro da casa do código',
        lanceInicial: 50,
        descricao: 'Livro sobre Teste Unitário'
    }
]

describe('Um avaliador que se conecta com a API', () => {
    test('Mostra todos os leilões retornados da API', async () => {
        getLeiloes.mockResolvedValueOnce(leiloes)
        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        })
        await flushPromises()

        const totalLeiloesExibidos = wrapper.findAll('.leilao').length
        expect(totalLeiloesExibidos).toBe(leiloes.length)
    });

    test('Não há leilões retornados da API', async () => {
        getLeiloes.mockResolvedValueOnce([])
        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        })
        await flushPromises()

        const totalLeiloesExibidos = wrapper.findAll('.leilao').length
        expect(totalLeiloesExibidos).toBe(0)
    });
});