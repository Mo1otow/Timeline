import React from 'react'
import { View } from 'react-native';
import { Modal as PaperModal, Portal } from 'react-native-paper'

export default React.forwardRef(function Modal({ children }, ref) {

    const [visible, setVisible] = React.useState(false);

    const showModal = React.useCallback(() => setVisible(true), [setVisible]);

    const hideModal = React.useCallback(() => setVisible(false), [setVisible]);

    ref.current = React.useMemo(() => ({
        show: showModal,
        hide: hideModal,
    }), [showModal, hideModal])

    return (
        <Portal>
            <PaperModal visible={visible} onDismiss={hideModal}>
                <View style={{
                    backgroundColor: '#fff',
                    marginHorizontal: 10,
                    alignItems: 'center',
                    borderRadius: 15
                }} >
                    {children}
                </View>
            </PaperModal>
        </Portal>
    )

})