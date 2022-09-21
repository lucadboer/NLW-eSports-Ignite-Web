import { Input } from "./Input";
import { Check, GameController, MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog'
import * as CheckBox from '@radix-ui/react-checkbox'
import { useEffect, useState } from "react";
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { FormEvent } from 'react'
import axios from "axios";

interface Game {
  id: string;
  title: string;
}


export function CreateAdModal() {

  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  useEffect(() => {
    axios("http://localhost:3333/games")
      .then(response => {
        setGames(response.data);
      });
  }, []);

  async function onSubmitModal(event: FormEvent) {
    event.preventDefault()
    
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)   
    
    
    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hoursStart: data.hourStart,
        hoursEnd: data.hourEnd,
        useVoiceChannle: useVoiceChannel
      })

      alert('Foi')
    } catch (err) {
      console.log(err);
      alert('não')   
    }
  }

    return ( 
    <Dialog.Portal>
    <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
    <Dialog.Content className="bg-[#2A2634] fixed py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-xl shadow-black/25">
      <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
        <form onSubmit={onSubmitModal} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">Qual o game?</label>
            <select className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-400 outline-none cursor-pointer" id="game" defaultValue="" name="game">
              
              <option disabled value="">Selecione o game que deseje jogar</option>

              {games.map((game) => {
                return <option className="text-base" key={game.id} value={game.id}>{game.title}</option>
              })}

            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input name="name" type="text" id="name" placeholder="Como te chamam dentro do game?"/>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input type="number" name="yearsPlaying" id="yearsPlaying" placeholder="Tudo bem se for ZERO" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual o seu discord?</label>
              <Input type="text" name="discord" id="discord" placeholder="Usuario#0000" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              
              <ToggleGroup.Root type="multiple" className="grid grid-cols-4 gap-2" onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                value="0" 
                title="Domingo"
                className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  D</ToggleGroup.Item>

                <ToggleGroup.Item
                value="1" 
                title="Segunda"
                className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  S</ToggleGroup.Item>

                <ToggleGroup.Item 
                value="2"
                title="Terça"
                className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  T</ToggleGroup.Item>

                <ToggleGroup.Item
                value="3" 
                title="Quarta"
                className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  Q</ToggleGroup.Item>

                <ToggleGroup.Item 
                value="4"
                title="Quinta"
                className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  Q</ToggleGroup.Item>

                <ToggleGroup.Item 
                value="5"
                title="Sexta"
                className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  S</ToggleGroup.Item>

                <ToggleGroup.Item
                value="6" 
                title="Sábado"
                className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  S</ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="time" name="hourStart" id="hourStart" placeholder="De"/>
                <Input type="time" name="hourEnd" id="hourEnd" placeholder="Até"/>
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-center text-sm">
            <CheckBox.Root 
            className="h-6 w-6 p-1 bg-zinc-900"
            checked={useVoiceChannel} 
            onCheckedChange={(checked) => {
              if (checked === true) {
                setUseVoiceChannel(true)
              } else {
                setUseVoiceChannel(false)
              }
            }}
            >
              <CheckBox.Indicator>
                <Check className="h-4 w-4 text-emerald-400"/>
              </CheckBox.Indicator>
            </CheckBox.Root>
            Costumo me conectar ao chat de voz
          </div>

          <footer className="flex justify-end items-center gap-4">
            <Dialog.Close type="button" className="bg-zinc-500 py-3 px-5 rounded-md font-semibold hover:bg-zinc-600 transition-all">Cancelar</Dialog.Close>
            <button className="bg-violet-500 flex items-center gap-2 font-semibold py-3 px-5 rounded-md hover:bg-violet-600" type="submit"><GameController size={24} /> Encontrar duo</button>
          </footer>
        </form>
    </Dialog.Content>
  </Dialog.Portal>
    )
}