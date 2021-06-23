import React, { useEffect, useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import Avatar from '@material-ui/core/Avatar';
import NotificationItem from '../../../components/NotificationItem/index';

import { getAllNotification } from '../../../api/notificationApi';

export default function NotifyDialog(props) {
  const [dataNotify, setDataNotify] = useState([]);

  const handleCloseNotify = () => {
    props.setOpen(false);
  };

  useEffect(() => {
      getAllNotification(1, 10)
        .then((res) => {
          if (res.status === 200) {
            setDataNotify(res.data.data.notification);
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err.message);
        });
  }, [props.open]);

  return (
    <Dialog
      open={props.open}
      onClose={handleCloseNotify}
      scroll="paper"
      fullWidth={true}
      maxWidth="xs"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title" className="noti-title">Notifications</DialogTitle>
      <DialogContent >
        <div className="notification">
          <div className="noti-content">
            <div className="noti-item">
              <div className="row mt-2">
                <div className="col-2 d-flex align-items-center">
                  <Avatar alt="Test" src="https://genk.mediacdn.vn/2018/8/23/anh-0-1535019031645146400508.jpg" />
                </div>
                <div className="col-9 d-flex flex-column">
                  <div className="text_20_b">0777 888 888</div>
                  <div>Điện thoại</div>
                </div>
                <div className="col-1 d-flex align-items-center">
                  <FiberManualRecordIcon className="noti-item-dot" />
                </div>
              </div>
            </div>

            {dataNotify &&
              dataNotify.map((notification) => (
                <div className="noti-item" key={notification._id}>
                    <NotificationItem />
                </div>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}