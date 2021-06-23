import React from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GroupItem from "../../components/Group/GroupItem/index";

export default function MultiSlider(props) {
    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        arrows: false,
    };
    return (
        <Slider {...settings}>
            {props.list &&
                props.list.map((group) => (
                    <div className="top-group-item" key={group._id}>
                        <GroupItem groupName={group.name} groupId={group._id} bgImage={"https://www.kpopnews.vn/uploadcontent/fileuploads/uploads/2019/08/30/8513dafe1aaf80cb6c23c1483c3f5129.jpg"} />
                    </div>
                ))}
        </Slider>
    );
}
