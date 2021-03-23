import { mount } from '@vue/test-utils'
import Leiloeiro from '@/views/Leiloeiro' 
// Fazendo o import desses métodos pois eles são chamados assim que o componente é montado
import { getLeilao, getLances } from '@/http'
// Essa biblioteca nos ajuda fazendo com que as promises sejam resolvidas antes de seguir(Fazendo com que os métoddos assíncronos sejam resolvidos)
import flushPromises from 'flush-promises'

// Pedindo ao JEST que ele simule a nossa dependência  @/http
jest.mock('@/http')

const leilao = {
    produto: 'Livro da casa do código',
    lanceInicial: 50,
    descricao: 'Livro bacana sobre VUE'
}

const lances = [
    {
        id: 1,
        valor: 1001,
        data: '2020-06-13T18:04:26.826Z',
        leilao_id: 1
    },
    {
        id: 2,
        valor: 1005,
        data: '2020-06-13T18:05:30.826Z',
        leilao_id: 1
    },
    {
        id: 3,
        valor: 1099,
        data: '2020-06-13T18:10:42.826Z',
        leilao_id: 1
    },
]

describe('Leiloeiro inicia um leilão que não possui lances', () => {
    test('Garantindo que a mensagem apareça quando não existir lances no leilão', async () => {
        // Pedimos ao JEST que toda vez que esse método for chamado, retornará um valor específico
        getLeilao.mockResolvedValueOnce(leilao) // Garantindo que quando o getLeilao for chamado, tenhamos um leilão mockado(fictício)
        getLances.mockResolvedValueOnce([]) // Garantindo que quando chamarmos o getLances, não tenhamos nenhum lance, para que a menssagem apareça notificando a ausência de lances para o leilão definido

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        // Aguardando as promises serem resolvidas
        await flushPromises()

        const messageNoAuctions = wrapper.find('div.alert')
        const messageShow = 'Ainda não existem lances para esse leilão!'

        expect(messageNoAuctions.element.textContent).toContain(messageShow)
        expect(messageNoAuctions.exists()).toBe(true)
    })
})

describe('Leiloeiro inicia um leilão comunicando os valores de menor e maior lance', () => {
    test('Mostra o menor lance do leilão específico', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()

        const lowestBid = wrapper.find('div.menor-lance')
        expect(lowestBid.element.textContent).toContain('Menor lance: R$ 1001')
    })

    test('Mostra o maior lance do leilão específico', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()

        const highestBid = wrapper.find('div.maior-lance')
        expect(highestBid.element.textContent).toContain('Maior lance: R$ 1099')
    })


})

describe('Leiloeiro exibe os lances existentes', () => {
    test('Garantindo que a messagem que avisa que não temos lances no leilão desapareça', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()

        const messageNoAuctions = wrapper.find('div.alert')
        expect(messageNoAuctions.exists()).toBe(false)
    })

    test('Garantindo que a lista de lances exista', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()

        const bidList = wrapper.find('ul.list-inline')
        expect(bidList.exists()).toBe(true)
    })
})