import { Text, ITextProps } from 'native-base'
import { ReactNode } from 'react'

interface TituloProps extends ITextProps{
    children: ReactNode
}

export function Titulo({children, ...rest}){
    return (
        <Text fontSize='2xl' fontWeight='bold' color='blue.500' textAlign='center' marginTop={10} {...rest}>
            {children}
        </Text>
    )
}