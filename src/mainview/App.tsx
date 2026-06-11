import { Chess } from 'chess.js';
import { useRef, useState } from 'react';
import { Chessboard, PieceDropHandlerArgs } from 'react-chessboard';

function App() {

	const chessGameRef = useRef(new Chess("rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2"));
    const chessGame = chessGameRef.current;

	function getTurnColor() : string {
		return chessGame.turn() === 'b' ? 'bg-black' : 'bg-white';
	}

	const [chessPosition, setChessPosition] = useState(chessGame.fen());
	const [history, setHistory] = useState(`${getMoveNumberString()}`);

	function getMoveNumberString(): string {
		return `${parseInt(chessGame.fen().split(" ")[5])}${(chessGame.turn() === 'b' ? '...' : '.')}`;
	}

	function addMove(san: String) {
		setHistory((old) => `${old} ${san}`)
		if (chessGame.turn() === 'w') {
			setHistory((old) => `${old} ${chessGame.moveNumber()}.`)
		}
	}

	function onPieceDrop({
      sourceSquare,
      targetSquare
    }: PieceDropHandlerArgs) {
      if (!targetSquare) {
        return false;
      }

      try {
        const moveDone = chessGame.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: 'q'
        });

		addMove(moveDone.san);

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
				<div className={`w-10 h-10 ${getTurnColor()} m-2 rounded-full`}></div>
				<Chessboard options={chessboardOptions} />
			</div>
			<div className='bg-white w-5/6 mx-auto my-4 md:mx-4 grow text-2xl p-4'>
				{history}
			</div>
		</div>
	);
}

export default App;
