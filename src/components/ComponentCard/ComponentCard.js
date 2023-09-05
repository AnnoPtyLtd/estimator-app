import './ComponentCard.css'

const ComponentCard = () => {
  return (
    <div className='component-card-container'>
        <h3 className='component-card-title'>Title</h3>
      <div className='component-detail'>
        <div className='component-detail-item'>
            <p className='detail-type'>Type</p>
            <p className='detail-name'>CPU</p>
        </div>
        <div className='component-detail-item'>
            <p className='detail-type'>Stock</p>
            <p className='detail-name'>In-Stock</p>
        </div>
        <div className='component-detail-item'>
            <p className='detail-type'>Cost</p>
            <p className='detail-name'>120$</p>
        </div>
        
      </div>
    </div>
  )
}

export default ComponentCard
