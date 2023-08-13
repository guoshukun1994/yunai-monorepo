import React from 'react'
import Button from '..'
import '../style'

export default function MyButton() {
	return <Button onClick={()=> console.log('这是一个可点击的Button')}>Button</Button>
}
