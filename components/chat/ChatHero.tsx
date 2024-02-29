"use client"
import React from 'react'
import { TextGenerateEffect } from '../shared/TextGenerateEffect'

const ChatHero = () => {
  return (
    <div className="w-full flex justify-start md:justify-center">
     <TextGenerateEffect words={"dontknow"} />
  </div>
   
  )
}

export default ChatHero