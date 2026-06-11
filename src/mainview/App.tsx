import { Chess } from 'chess.js';
import { useRef, useState } from 'react';
import { Chessboard, PieceDropHandlerArgs } from 'react-chessboard';

function App() {

	const chessGameRef = useRef(new Chess());
    const chessGame = chessGameRef.current;

	const [chessPosition, setChessPosition] = useState(chessGame.fen());

	function onPieceDrop({
      sourceSquare,
      targetSquare
    }: PieceDropHandlerArgs) {
      if (!targetSquare) {
        return false;
      }

      try {
        chessGame.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: 'q'
        });

        setChessPosition(chessGame.fen());

        return true;
      } catch {
        return false;
      }
    }

	const chessboardOptions = {
      position: chessPosition,
      onPieceDrop,
      id: 'mainGame'
    };


	return (
		<div className="h-full min-h-screen bg-gradient-to-br from-orange-500 to-red-900 flex flex-col md:flex-row">
			<div className='w-5/6 md:w-2/3 mx-auto md:my-auto md:h-3/4 my-4 md:mx-4'>
				<Chessboard options={chessboardOptions} />
			</div>
			<div className='bg-white w-5/6 mx-auto my-4 md:mx-4 grow'>
				
			</div>
		</div>
	);
}

export default App;
