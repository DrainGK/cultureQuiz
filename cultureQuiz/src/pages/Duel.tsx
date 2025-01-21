import React, { useEffect, useState } from 'react'
import { DuelData, Player } from '../utils/types'
import { shuffleArray, updateEloForBoth } from '../utils/utils';
import { useNavigate, useParams } from 'react-router-dom';

const Duel: React.FC = () => {
    const [duel, setDuel] = useState<DuelData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [maxTurn, setMaxTurn] = useState<number>(1);
    const [playerArray, setPlayerArray] = useState<Player[]>([]);
    const [topPlayer, setTopPlayer] = useState<Player | null>(null);
    const { slugAndId } = useParams<{ slugAndId: string}>();
      const navigate = useNavigate();
    

    let duelId = null;
    if (slugAndId) {
        const parts = slugAndId.split("-");
        duelId = parts[parts.length - 1]; // dernier élément (e.g. "42")
    }

    useEffect(() => {
        const fetchDuel = async () => {
          try {
            const response = await fetch("/data_duel.json");
            if (!response.ok) {
              throw new Error("Erreur lors de la récupération des données");
            }
      
            const data = await response.json();
            console.log("Données JSON récupérées :", data);
      
            const foundDuel = data.duels.find(
              (duel: DuelData) => duel.id === parseInt(duelId ?? "", 10)
            );
      
            if (!foundDuel) {
              throw new Error("Duel introuvable.");
            }
      
            console.log("Duel trouvé :", foundDuel);
            setDuel(foundDuel);
            setPlayerArray(foundDuel.player); // Initialisation du tableau des joueurs
          } catch (err) {
            console.error("Erreur :", err);
            setError((err as Error).message);
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchDuel();
      }, [duelId]);

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
    <div className='text-black max-w-lg text-left gap-y-5 px-5 mx-auto min-h-screen flex flex-col items-center border-x border-orange-200"'>

        <div onClick={() => navigate("/")} className="text-black w-full flex text-4xl items-start mt-5 cursor-pointer">
             <p>←-</p> 
        </div>

        <div className="w-full h-2 mb-5 mt-3 bg-gray-200 rounded-full shadow-inner">
            <div
              className="h-2 bg-orange-500 rounded-full"
              style={{ width: `${maxTurn}0%` }}
            />
        </div>

        <h3 className='font-pirata text-4xl my-5'>
            {duel.titre}
        </h3>

        <div className='flex font-raleway font-bold text-xl gap-10 flex-col items-center w-full'>
            <div className='w-full flex justify-start'>
                <div>
                <p className='mb-2'>{playerArray[0].name} 🔥</p>
                    <img className='w-[300px] h-[175px] object-cover object-top rounded-s-xl' src={playerArray[0].img} onClick={() => startDuel(playerArray[0], playerArray[1])} alt={playerArray[0].name} 
                    style={{
                        clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)"
                    }}/>
                </div>
            </div>

            <p>🆚</p>

            <div className='w-full flex justify-end'>
                <div>
                <p className='w-full text-right mb-2'>🔥 {playerArray[1].name}</p>
                    <img className='w-[300px] h-[175px] object-cover object-top rounded-e-xl' src={playerArray[1].img} onClick={() => startDuel(playerArray[1], playerArray[0])} alt={playerArray[1].name} 
                    style={{
                        clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)", // Diagonale côté gauche
                    }}/>
                </div>
            </div>
        </div>
    </div>
  ):(
    <div className='max-w-lg text-black text-left mx-auto min-h-screen flex flex-col items-center gap-y-2 border-x border-orange-200 px-5'>
        <h3 className='font-pirata text-4xl mt-10 mb-5'>
            {duel.titre}
        </h3>

        <p className='w-full font-raleway my-10 font-bold text-3xl'>Voici ton survivant ⬇️</p>
        <p className='w-full font-raleway font-bold text-xl'>🔥 {topPlayer?.name}</p>
        <img className='w-full h-[272px] mb-5 rounded-xl object-cover object-top' src={topPlayer?.img} alt={topPlayer?.name} />
        <button
              onClick={() => window.location.reload()}
              className="text-white w-full bg-orange-500 py-6 rounded-2xl"
            >
              Encore une fois?
            </button>
            <button
              onClick={() => navigate("/")}
              className="text-white w-full bg-orange-500 py-6 rounded-2xl"
            >
              Retour à la sélection
            </button>
    </div>
  )
}

export default Duel