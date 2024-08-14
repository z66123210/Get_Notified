import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../Services/AxiosClient';


const AccountSubscription = ({subscription}) => {
  return (
    <section>
      <hr />
      <h4>
        <a href={`https://dashboard.stripe.com/test/subscriptions/${subscription.id}`}>
          {subscription.id}
        </a>
      </h4>

      <p>
        Status: {subscription.status}
      </p>

      <p>
        Card last4: {subscription.default_payment_method?.card?.last4}
      </p>

      <p>
        Current period end: {(new Date(subscription.current_period_end * 1000).toString())}
      </p>

      {/* <Link to={{pathname: '/change-plan', state: {subscription: subscription.id }}}>Change plan</Link><br /> */}
      <Link to={'/cancel'} state={{subscription: subscription.id }}>Cancel</Link>
    </section>
  )
}

const Account = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const {subscriptions} = await fetch('api/subscriptions').then(r => r.json());

  //     setSubscriptions(subscriptions.data);
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/api/billing/subscriptions');
        setSubscriptions(response.data.subscriptions.data);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    fetchData();
  }, []);

  if (!subscriptions) {
    throw new Error('subscription is null or undifined');
  }

  return (
    <div>
      <h1>Account</h1>

      <a href="/prices">Add a subscription</a>
      <a href="/">Restart demo</a>

      <h2>Subscriptions</h2>

      <div id="subscriptions">
        {subscriptions.map(s => {
          return <AccountSubscription key={s.id} subscription={s} />
        })}
      </div>
    </div>
  );
}

export default Account;
