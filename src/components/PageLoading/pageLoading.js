import React from 'react';

import LoadingGif from '../../assets/images/spinner-100px.gif';

export default function PageLoading(props) {

    return (
        <div className="page-loader-container">
          <div className="page-loading">
            <img src={LoadingGif} />
          </div>
        </div>
      )
}