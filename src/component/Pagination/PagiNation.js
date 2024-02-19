import React from 'react'
import React from 'react';
import { Pagination } from 'antd';

const PagiNation = () => {
  return (
    <div>
    <Pagination defaultCurrent={1} total={50} />;
    </div>
  )
}

export default PagiNation