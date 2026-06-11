import { Chess } from 'chess.js';
import { useRef, useState } from 'react';
import { Chessboard, PieceDropHandlerArgs } from 'react-chessboard';

function App() {

	const chessGameRef = useRef(new Chess());
    const chessGame = chessGameRef.current;

	function getTurnColor() : string {
		return chessGame.turn() === 'b' ? 'bg-black' : 'bg-white';
	}

	const [chessPosition, setChessPosition] = useState(chessGame.fen());
	const [history, setHistory] = useState(`${getMoveNumberString()}`);
	const [promotionPiece, setPromotionPiece] = useState('q');

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
          promotion: promotionPiece,
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
			<div className='w-5/6 md:w-[45%] mx-auto md:my-auto md:h-fit my-4 md:mx-4'>				
				<div className='flex flex-row justify-center items-center h-fit'>
					<div className={`w-10 h-10 ${getTurnColor()} m-2 rounded-full`}></div>
					Promote pawn to
					<select className='m-2' onChange={(v) => setPromotionPiece(v.target.value)}>
						<option value='q' defaultChecked>queen</option>
						<option value='r'>rook</option>
						<option value='b'>bishop</option>
						<option value='n'>knight</option>
					</select>
				</div>
				<div className='h-fit'>
					<Chessboard options={chessboardOptions} />
				</div>
			</div>
			<div className='bg-white w-5/6 sm:w-1/3 h-full md:h-[95%] flex-1 mx-auto my-4 md:mx-4 text-4xl p-4 overflow-y-auto'>
				{history}
			</div>
		</div>
	);
}

export default App;
