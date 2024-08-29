import axios from 'axios';
import React, {  useEffect, useRef, useState } from 'react'
import { useForm} from 'react-hook-form'
import { Collapse, Button, CardBody, Card,Alert } from 'reactstrap';
import { cardData } from './card';
import { useNavigate } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';

const CreditOrDebit = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const { register,handleSubmit,formState:{errors}}=useForm();
    const [cardImage,setcardImage]=useState('')
    const [cardname,setcardname]=useState('')
    // alert(JSON.stringify(Cards))
    const [allCard,setallCard]=useState([]);
    const navigate=useNavigate();
    const [loading,setloading]=useState(false)
    const [space,setSpace]=useState('')
    const [expireDate, setExpireDate] = useState('');

    

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };
    const toggleCollapse2 = () => {
        setIsOpen2(!isOpen2);
    };
    
    // formated number with annonyzation
    function spaceFormatedCcNumberCheck(e){
        const  value=e.target.value.replace(/[^0-9]/gi, '').replace(/(.{4})/g, '$1 ').trim();
        setSpace(value)
        e.target.value = value;
        
    }
    // check which card
    const SixDigitGetNumber=async(e)=>{
        const SixDigitGetNumber=e.target.value;
        // alert(SixDigitGetNumber)
        if(SixDigitGetNumber.length >= 6 ){
            const matchedCard=cardData.Cards.find((card)=>{
                return card.bin.some((bin)=>SixDigitGetNumber.startsWith(bin))
            })
            // console.log(matchedCard)
            if(matchedCard){
                // console.log(matchedCard.name);
                 setcardImage(matchedCard.image);
                 setcardname(matchedCard.name);
                 
            }
        }
    }
    const onsubmit=async(formData)=>{
        setloading(true)
        const form=new FormData();
        form.append('card_holder_name',formData.card_holder_name);
        form.append('card_number',formData.card_number);
        form.append('card_expire',formData.card_expire);
        form.append('card_cvv',formData.card_cvv);
        
        try {
            const response=await axios.post("http://localhost:8081/api/cardData",form,{
                headers:{
                    'Content-Type':'multipart/form-data',
                },
            });
            // console.log(response)
            if (response.data.error) {
                // Display error message to the user
                // alert(response.data.error);
              } else {
                // Card data submitted successfully
                // alert(response.data.message);
                setallCard([...allCard, { card_number: formData.card_number, card_holder_name: formData.card_holder_name }]);
                setTimeout(() => {
                    navigate("/success");
                }, 3000);
              }
        } catch (error) {
            alert("invalid card number or expire date");
        }finally{
            setloading(false)
        }
    
    }

    useEffect(()=>{
        GetAllCards();
    },[])
    

    const GetAllCards=async()=>{
        try {
            const response= await axios.get("http://localhost:8081/api/getAllCards");
            // console.log(response);
            setallCard(response.data.data)
            // console.log(allCard)
        } catch (error) {
            
        }
    }
  
    
    const annonyZeCard = (cardNumber) => {
        const last4Digits = cardNumber.substring(cardNumber.length - 4);
        const first12Digits = cardNumber.slice(0, -4);
      
        let q = '';
        for (let i = 0; i < first12Digits.length; i++) {
          q += '*';
        }
      
        return q + last4Digits;
      };

    const handleInput=(e)=>{
        const value=e.target.value;
        if(value.length === 2 && !value.includes("/")){
            e.target.value=`${value}/`;
        }
    } 
   
  return (
    <div>
    
       <section >
            <div className="container py-5">
                <div className="card " >
                <div className="card-body">
                    <div className="row d-flex justify-content-center pb-5">
                    <div className="col-md-7 col-xl-5 mb-4 mb-md-0">
                        <div className="py-4 d-flex flex-row">
                        <h5><span className="far fa-check-square pe-2" /><b>ELIGIBLE</b> |</h5>
                        <span className="ps-2">Pay</span>
                        </div>
                        
                        <h4>Payment  Page</h4>
                        <div className="d-flex pt-2">
                        <div>
                            <p>
                            <b>Insurance Responsibility <span className="text-success">$71.76</span></b>
                            </p>
                        </div>
                        <div className="ms-auto">
                            <p className="text-primary">
                            <i className="fas fa-plus-circle text-primary pe-1" />Add insurance card
                            </p>
                        </div>
                        </div>
                        <p>
                        Insurance claims and all necessary dependencies will be submitted to your
                        insurer for the coverred portion of this order
                        </p>
                        <div className="rounded d-flex bg-body-tertiary">
                        <div className="p-2">Aetna-Open Access</div>
                        <div className="ms-auto p-2">OAP</div>
                        </div>
                        <hr />
                        <div className="pt-2">
                        <div className="d-flex pb-2">
                            <div>
                            <p style={{width:"160px"}}>
                                <b >Patient Balance <span className="text-success">$13.24</span></b>
                            </p>
                            </div>
                            <div style={{display:"grid",gridTemplateRows:"auto auto"}}>
                                <div className="ms-auto">
                                {
                                    isOpen ? (
                                        <p className="text-danger " onClick={toggleCollapse} style={{ cursor: "pointer" }}>
                                            <i className="fas fa-minus-circle text-danger pe-1" style={{ marginBottom: '1rem' }} /> Remove card
                                        </p>
                                    ) : (
                                        <p className="text-primary " onClick={toggleCollapse} style={{ cursor: "pointer",width:"520px"  }}>
                                            <i className="fas fa-plus-circle text-primary ps-5  " style={{ marginBottom: '1rem'}} /> Add payment card
                                        </p>
                                    )
                                }                               
                                
                                </div>
                            <div>
                                <Collapse horizontal isOpen={isOpen}>
                                <Alert style={{width: '360px' }} >
                                    <form action=""  className='bg-dark' onSubmit={handleSubmit(onsubmit)}>
                                    
                                    <p class="fw-bold mb-4">Add new card:</p>
                    
                                    <div className="fw-bold mb-4 pb-2">
                                        <div className="d-flex flex-row align-items-center mb-4 pb-1">
                                            <div className="flex-fill mx-3">
                                                <div className="form-inline">
                                                    <div data-mdb-input-init className="form-outline mb-4 text-start ">
                                                        <div className="row mb-4">
                                                            <div className="col-7">
                                                                <input type="text" id="formControlLgExpk" className="form-control form-control-lg" name="card_holder_name" {...register('card_holder_name',{required:true,pattern : /^[a-zA-Z\s]+$/})}  placeholder="Card Holder Name" />
                                                                <label className="form-label float-left" htmlFor="formControlLgExpk">Card Holder Name</label>
                                                            </div>
                                                            {errors.card_holder_name && (<span className='text-danger'>Card Holder Name Required</span>)}
                                                            
                                                        </div>
                                                        <div className="row mb-4">
                                                            <div className="col-10">
                                                                <input type="text" id="card_number" autoComplete='username' className="form-control form-control-lg" defaultValue={space}   name="card_number" onKeyUp={(e)=>{SixDigitGetNumber(e);spaceFormatedCcNumberCheck(e)}} onChange={(e)=>{setSpace(e.target.value);}} maxLength={19} minLength={19}   placeholder="Card Number" {...register('card_number',{required:true,pattern: /^[0-9\s]+$/})}/>
                                                                <label className="form-label float-left" htmlFor="card_number">Card Number</label>
                                                            </div>
                                                            {errors.card_number && (<span className='text-danger'>Card Number Required</span>)}
                                                            <div className="col-1">
                                                            <img id='card-image' src={cardImage} className='ms-2 mt-2'  height={30} width={30} alt="" />

                                                            </div>
                                                            
                                                        </div>
                                                    
                                                        <div className="row mb-4">
                                                        <div className="col-4">
                                                            <div data-mdb-input-init className="form-outline">
                                                                <input type="text" id="formControlLgExpk2" className="form-control form-control-lg"  style={{width:"95px"}} name="card_expire"    placeholder="MM/YYYY" {...register('card_expire',{required:true,pattern:/^\d{2}\/\d{2}$/})} onInput={handleInput}  />
                                                                <label className="form-label float-left" htmlFor="formControlLgExpk2">Expire</label>
                                                                {errors.card_expire && (<span className='text-danger'>Card expire required</span>)}
                                                            </div>
                                                            
                                                        </div>
                                                        
                                                        <div className="col-2">
                                                            <div data-mdb-input-init className="form-outline">
                                                                <input type="password" autoComplete='current-password' id="formControlLgcvv" minLength={3} maxLength={3} className="form-control form-control-lg" style={{width:"80px"}}  name="card_cvv"   placeholder="***" {...register('card_cvv',{required:true,pattern:/^\d{3}$/})} />
                                                                <label className="form-label float-left" htmlFor="formControlLgcvv">Cvv</label>
                                                            </div>
                                                            {errors.card_cvv && (<span className='text-danger'>Card Cvv Required</span>)}
                                                        </div>
                                                        
                                                            
                                                        </div>
                                                        <button className="btn btn--e-transparent-brand-b-2 btn-outline-primary w-75"  disabled={ loading}  type="submit">{loading ? <span>Proceed <SpinnerCircular thickness={180} speed={169} size={39}  color="rgba(57, 162, 172, 1)" secondaryColor='rgba(172, 57, 59, 0.86)' /></span> : "Proceed"}</button>
                                                        </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </form>
                                </Alert>
                                </Collapse>
                            </div>
                            </div>
                        </div>
                        <p>
                            This is an estimate for the portion of your order (not covered by
                            insurance) due today . once insurance finalizes their review refunds
                            and/or balances will reconcile automatically.
                        </p>
                        <form className="pb-3">
                            <div className="d-flex flex-row pb-3">
                                {allCard.slice(0, 2).map((card, index) => (
                                <div key={index}>
                                    <div className="d-flex align-items-center pe-2">
                                    <input className="form-check-input"    type="radio"    name="radioNoLabel"    id={`radioNoLabel${index + 1}`}    defaultValue    aria-label="..."    defaultChecked={index === 0} />
                                    </div>
                                    <div className="rounded border d-flex w-100 p-3 align-items-center">
                                    <p className="mb-0">
                                        <i className="fab fa-cc-visa fa-lg text-primary pe-2" />{cardname}
                                    </p>
                                    <div className="ms-auto">{annonyZeCard(card.card_number)}</div>
                                    </div>
                                </div>
                                ))}
                                
                                {allCard.length > 2 && (
                                    isOpen2 ? (
                                        <Button color="primary" onClick={toggleCollapse2} style={{ marginBottom: '1rem' }}>
                                            Show Less
                                        </Button>
                                    ): (
                                        <Button color="primary" onClick={toggleCollapse2} style={{ marginBottom: '1rem' }}>
                                            Show More
                                        </Button>
                                    )
                                )}
                                <Collapse isOpen={isOpen2}>
                                {allCard.slice(2).map((card, index) => (
                                    <div key={index +2}>
                                    <div className="d-flex align-items-center pe-2">
                                        <input
                                        className="form-check-input"
                                        type="radio"
                                        name="radioNoLabel"
                                        id={`radioNoLabel${index + 3}`}
                                        defaultValue
                                        aria-label="..."
                                        />
                                    </div>
                                    <div className="rounded border d-flex w-100 p-3 align-items-center">
                                        <p className="mb-0">
                                        <i className="fab fa-cc-visa fa-lg text-primary pe-2" />{cardname}
                                        </p>
                                        <div className="ms-auto">{annonyZeCard(card.card_number)}</div>
                                    </div>
                                    </div>
                                ))}
                                </Collapse>
                            </div>
                        </form>
                        <button className="btn btn--e-transparent-brand-b-2 btn-outline-primary w-75"  disabled={ loading}  type="submit">{loading ? <span>Proceed <SpinnerCircular thickness={180} speed={169} size={39}  color="rgba(57, 162, 172, 1)" secondaryColor='rgba(172, 57, 59, 0.86)' /></span> : "Proceed"}</button>
                        </div>
                    </div>
                    <div className="col-md-5 col-xl-4 offset-xl-1">
                        <div className="py-4 d-flex justify-content-end">
                        <h6><a href="#!">Cancel and return to website</a></h6>
                        </div>
                        <div className="rounded d-flex flex-column p-2 bg-body-tertiary">
                        <div className="p-2 me-3">
                            <h4>Order Recap</h4>
                        </div>
                        <div className="p-2 d-flex">
                            <div className="col-8 text-start">Total Price</div>
                            <div className="ms-auto">$186.76</div>
                        </div>
                        <div className="p-2 d-flex">
                            <div className="col-8 text-start">Cuppon</div>
                            <div className="ms-auto">SAVE20</div>
                        </div>
                        <div className="p-2 d-flex">
                            <div className="col-8 text-start">Discount</div>
                            <div className="ms-auto">10 (%)</div>
                        </div>
                        <div className="p-2 d-flex">
                            <div className="col-8 text-start">Items</div>
                            <div className="ms-auto">3</div>
                        </div>
                        <div className="border-top px-2 mx-2" />
                        <div className="p-2 d-flex pt-3">
                            <div className="col-8 text-start">Donate</div>
                            <div className="ms-auto">00.00</div>
                        </div>
                                                
                        <div className="border-top px-2 mx-2" />
                        <div className="p-2 d-flex pt-3">
                            <div className="col-8 text-start"><b>Total</b></div>
                            <div className="ms-auto"><b className="text-success">$85.00</b></div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
        

    </div>
  )
}

export default CreditOrDebit
