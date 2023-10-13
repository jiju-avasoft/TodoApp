import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

interface BottomSheetProps {
  children: any;
  ref: any;
}

const BottomSheetComponent: React.FC<BottomSheetProps> = props => {
  return (
    <RBSheet
      ref={props.ref}
      height={500}
      openDuration={50}
      closeDuration={50}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
        container: {
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          elevation: 20,
        },
      }}
      animationType="slide">
      {props.children}
    </RBSheet>
  );
};

export default BottomSheetComponent;
