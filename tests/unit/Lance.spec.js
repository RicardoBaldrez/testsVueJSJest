// vue/test-utils -> Nos garante a interação com nossos componentes em tempo de teste
// @ é um atalho do webpack para a diretório 'src'
import Lance from '@/components/Lance';
import { mount }  from '@vue/test-utils'

test('Garantindo que o script de teste vai localizar o componente Lance', () => {
    // Testando/garantindo que o script de teste vai localizar o arquivo/componente(Lance)
    expect(true).toBe(true)
})

test('Garantindo que o componente Lance foi realmente montado', () => {
    // Montando nosso componente Lance
    /*
        mount -> Cria um Wrapper que contém o componente Vue montado e renderizado.
        Assim renderizando tanto o componente montado em questão, como também os 
        componentes filhos.
    */
    const wrapper = mount(Lance)
    expect(wrapper).toBeTruthy()
})

describe('Um lance sem valor minimo', () => {
    test('Garantindo que o usuário não de um lance menor que zero', () => {
        const wrapper = mount(Lance)
        const inputLance = wrapper.find('input') // find -> Procura esse elemento html dentro do wrapper(componente Lance)
        inputLance.setValue(-100) // setValeu -> Seta um valor dentro do input
        const lancesEmitidos = wrapper.emitted('novo-lance') // Esperando que o evento 'novo-lance' seja emitido
        wrapper.trigger('submit')
        expect(lancesEmitidos).toBeUndefined()
    })
    
    test('Garantindo que seja emitido um novo lance quando o valor for maior que zero', () => {
        const wrapper = mount(Lance)
        const inputLance = wrapper.find('input')
        inputLance.setValue(100)
        wrapper.trigger('submit')
        const lancesEmitidos = wrapper.emitted('novo-lance')
        expect(lancesEmitidos).toHaveLength(1)
    })
    
    test('Garantindo a emissão de um valor esperado de um lance válido', () => {
        const wrapper = mount(Lance)
        const inputLance =wrapper.find('input')
        inputLance.setValue(200)
        wrapper.trigger('submit')
        const lancesEmitidos = wrapper.emitted('novo-lance')
        const lance = parseInt(lancesEmitidos[0][0])
        expect(lance).toBe(200)
    })
})

describe('Um lance com valor minimo', () => {
    test('Garantindo que todos os lances tenham um valor maior que o lance minimo informado', () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        })

        const input = wrapper.find('input')
        input.setValue(400)
        wrapper.trigger('submit')
        const lancesEmitidos = wrapper.emitted('novo-lance')
        expect(lancesEmitidos).toHaveLength(1)
    })

    test('Garantindo a emissão de um valor esperado de um lance válido', () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        })

        const input = wrapper.find('input')
        input.setValue(301)
        wrapper.trigger('submit')
        const lancesEmitidos = wrapper.emitted('novo-lance')
        const lance = parseInt(lancesEmitidos[0][0])
        expect(lance).toBe(301)
    })
})