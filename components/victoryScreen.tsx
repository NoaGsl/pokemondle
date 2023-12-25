import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';

type VictoryScreenProps = {
    pokemonName: string,
    nbGuess: number,
    img: string
  };

export default function VictoryScreen({pokemonName, nbGuess, img}: VictoryScreenProps) {
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#fff',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    function restart(){
        window.location.reload();
    }


    return (
        <div className="flex justify-center">
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className='flex justify-center flex-col text-center bg-gray-500'>
                <h1>Victoire !</h1>
                <p>Le pokemon à deviner était:</p>
                <img className='self-center' src={img} alt={pokemonName}/>
                <p>{pokemonName} !</p>
                <p>Vous avez trouvé en {nbGuess} essais</p>
                <button className='bg-cyan-500 w-1/4 self-center' onClick={() => restart()}>Rejouer</button>
            </div>
        </Box>
      </Modal>
        </div>
    )
}