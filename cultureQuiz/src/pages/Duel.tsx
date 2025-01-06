import React, { useEffect, useState } from 'react'
import { DuelData, Player } from '../utils/types'
import { shuffleArray, updateEloForBoth } from '../utils/utils';

const Duel: React.FC = () => {
    const [duel, setDuel] = useState<DuelData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [maxTurn, setMaxTurn] = useState<number>(0);
    const [playerArray, setPlayerArray] = useState<Player[]>([]);
    const [topPlayer, setTopPlayer] = useState<Player | null>(null);

    useEffect(() => {
        const fetchDuel = async ()=> {
            try{
                const response = await fetch("data_duel.json");
                if (!response.ok){
                    throw new Error("Erreur lors de la recuperation des donnees");
                }

                const data = await response.json();
                setDuel(data.duels[0]);
                console.log(data.duels[0]);
                setPlayerArray(data.duels[0].player);
               
            } catch(err){
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchDuel();
    },[])

    const startDuel = (winner: Player, loser: Player) => {
        console.log(maxTurn);
        
        if(maxTurn <= 10){
            console.log("winner before: elo ",winner.name + winner.elo);
            console.log("loser before: elo ",loser.name + loser.elo);
            updateEloForBoth(winner, loser);
            console.log("winner after: elo ",winner.name + winner.elo);
            console.log("loser after: elo ", loser.name + loser.elo);
            setMaxTurn(maxTurn+1);
            setPlayerArray(shuffleArray(playerArray))
            setTopPlayer(findHighestElo(playerArray))
        } 
    }

    const findHighestElo = (players: Player[]): Player | null => {
        const maxElo = Math.max(...players.map(player => player.elo));
        return players.find(player => player.elo === maxElo) || null;
    }

    if (isLoading) {
        return <p className="text-center">Chargement des données...</p>;
      }
    
      if (error) {
        return <p className="text-red-500 text-center">Erreur : {error}</p>;
      }
    
      if (!duel) {
        return <p className="text-red-500 text-center">Aucune donnée disponible.</p>;
      }

  return maxTurn <= 10? (
    <div className='text-black'>
        <h1 className=''>Duel</h1>
        <p>{maxTurn}</p>
        <div className='flex gap-4'>
            <button className='' onClick={() => startDuel(playerArray[0], playerArray[1])}>{playerArray[0].name}</button>
            <button className='' onClick={() => startDuel(playerArray[1], playerArray[0])}>{playerArray[1].name}</button>
        </div>
    </div>
  ):(
    <div className='flex flex-col gap-4 bg-orange-500'>
        <p> THE WINNER IS <br /> {topPlayer?.name} <br /> with an elo of {topPlayer?.elo}</p>
    </div>
  )
}

export default Duel