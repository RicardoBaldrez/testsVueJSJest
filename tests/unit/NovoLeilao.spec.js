import NovoLeilao from '@/views/NovoLeilao'
import { mount } from '@vue/test-utils'
import { createLeilao } from '@/http'

jest.mock('@/http')

// Por conta do erro informado no teste, dizemos simplesmente que nosso push é uma função
// Então aqui temos um router simulado
const $router = {
    push: jest.fn()
}

describe('Um novo leilão deve ser criado', () => {
    test('Dado o formulário preenchido, um leilão deve ser criado', () => {
        createLeilao.mockResolvedValueOnce()

        const wrapper = mount(NovoLeilao, {
            // E aqui injetamos nosso router simulado
            mocks: {
                $router
            }
        })

        wrapper.find('.produto').setValue('Um livro da casa do código')
        wrapper.find('.descricao').setValue('Conteúdo de primeira')
        wrapper.find('.valor').setValue(50)
        wrapper.find('form').trigger('submit')
        
        expect(createLeilao).toHaveBeenCalled()
    })
})