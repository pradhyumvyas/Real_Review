'use client'

import Messagecard from '@/components/custom-component/Messagecard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { Message, User } from '@/model/User.model'
import { AcceptMessageSchema } from '@/schemas/acceptMessageSchema'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import { Switch } from '@radix-ui/react-switch'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import React,{useCallback, useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'

const page = () => {
  const [message, setMessage] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSwitchLoading, setIsSwitchLoading] = useState<boolean>(false)
  const {toast} = useToast()

  const handleDeleteMessage = (messageId:string)=>{
    setMessage(message.filter((msg)=>msg._id !== messageId))
  }

  const {data:session} = useSession()
  const form = useForm({
    resolver:zodResolver(AcceptMessageSchema)
  })

  const {register,watch,setValue} = form
  const acceptMessages = watch('acceptMessages')

  const fetchAcceptMessage = useCallback(async() => {
    setIsSwitchLoading(true)

    try{
      const response = await axios.get<ApiResponse>('/api/accept-message')
      setValue('acceptMessages',response.data.isAcceptingMessages)

    }catch(error){
      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title:'Error',
        description:axiosError.response?.data.message || "Failed to fetch messages",
      })
    }finally{
      setIsSwitchLoading(false)
    }

  },[setValue])

  const fetchMessages = useCallback(async(refresh:boolean = false)=>{
    setIsLoading(true)
    setIsSwitchLoading(true)

    try{
      const response = await axios.get<ApiResponse>('/api/get-messages')
      setMessage(response.data.messages || [])
      toast({
        title:'Success',
        description:'Latest Messages fetched successfully',
      })

    }catch(error){
      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title:'Error',
        description:axiosError.response?.data.message || "Failed to fetch messages",
        variant:'destructive'
      })
    }finally{
      setIsLoading(false)
      setIsSwitchLoading(false)
    }
  },[setIsLoading, setMessage])

  useEffect(()=>{
    if(!session || !session.user){
      return
    }
    fetchMessages()
    fetchAcceptMessage()

  },[session, setValue, fetchAcceptMessage, fetchMessages])

  const handleSwichChange = async() =>{
    try{
      const response = await axios.post<ApiResponse>('/api/accept-message',{
        acceptMessages:!acceptMessages
      })
      setValue('acceptMessages',!acceptMessages)
      toast({
        title:'Success',
        description:response.data.message,
      })
    }catch(error){
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title:'Error',
        description:axiosError.response?.data.message || "Failed to update messages",
        variant:'destructive'
      })
    }
  }


  if(!session || !session.user){
    return <div>Unauthorized</div>
  }

  const {username} = session.user as User;
  const baseUrl = `${window.location.protocol}//${window.location.host}`
  const profileUrl = `${baseUrl}/u/${username}`

  const copyToClipboard = () =>{ 
    navigator.clipboard.writeText(profileUrl)
    toast({
      title:'URL Copied',
      description:'Profile URL copied to clipboard',
    })
  }
  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>
      <div className="mb-4">
        <h2>Profile</h2>
        <p>Username: {username}</p>
        <input type='text' value={profileUrl} readOnly className=''/>
        <Button onClick={copyToClipboard}>Copy</Button>
      </div>

      <div>
        <Switch
          {...register('acceptMessages')}
          checked={acceptMessages}
          onCheckedChange={handleSwichChange}
          disabled={isSwitchLoading}
          />
          <span className='ml-2'>
            Accept Messages:{acceptMessages ? 'on' : 'off'}
          </span>
      </div>
      <Separator/>
      <h2>Messages</h2>
      {isLoading && <div>Loading...</div>}
      {!isLoading && message.length === 0 && <div>No messages</div>}
      {!isLoading && message.length > 0 && (
        <ul>
          {message.map((msg)=>(
            <Messagecard key={msg._id} message={msg} onMessageDelete={handleDeleteMessage}/>
          ))}
        </ul>
      )}

    </div>
  )
}

export default page