import React from 'react'
import Card from './Card'

const Slot = (props) => {
    const { slot, row, col, slotId, label } = props

    return (
        <div className='slot'>
            {
                console.log(slot)
            }
            {
                slot.map((card, depth) => (
                    <Card 
                        row={row} 
                        col={col} 
                        depth={depth} 
                        card={card}
                        label={label}
                        // style={(depth === 0) ? {marginLeft: '-15rem'} : {marginLeft: '-15rem'}}
                        style={{marginLeft: '-135rem'}}
                    />
                ))
            }


        </div>
    )

}

export default Slot