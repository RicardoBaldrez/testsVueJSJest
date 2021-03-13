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