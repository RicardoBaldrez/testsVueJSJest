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

describe('Leiloeiro inicia um leilão que não possui lances', () => {
    test('Garantindo a mensagem quando não existem lances no leilão', async () => {
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
        // const messageShow = 'Ainda não existem lances para esse leilão!'

        // expect(messageNoAuctions.element.textContent).toContain(messageShow)
        expect(messageNoAuctions.exists()).toBe(true)
    })
})