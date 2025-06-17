import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState({ show: false, type: '', message: '' });
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);
  const notificationScrollRef = useRef(null);
  const navigation = useNavigation();
  
  const [notifications] = useState([
    {
      linha: { nome: 'Rubi' },
      titulo: 'Manutenção Programada',
      texto: 'Obras na Estação Luz das 22h às 5h',
      dataEnvio: new Date().toISOString()
    },
    {
      linha: { nome: 'Turquesa' },
      titulo: 'Operação Normal',
      texto: 'Todas as estações funcionando normalmente',
      dataEnvio: new Date().toISOString()
    }
  ]);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const logged = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(logged === 'true');
      } catch (error) {
        console.log('Erro ao verificar login:', error);
      }
    };
    
    checkLogin();

    // Auto-scroll das notificações
    if (notifications.length > 1) {
      const interval = setInterval(() => {
        setCurrentNotificationIndex(prev => {
          const nextIndex = (prev + 1) % notifications.length;
          notificationScrollRef.current?.scrollTo({
            x: nextIndex * (width - 30),
            animated: true
          });
          return nextIndex;
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [notifications.length]);

  const getLineNumber = (lineName) => {
    const lineNumbers = {
      'Rubi': '7',
      'Turquesa': '10',
      'Coral': '11',
      'Safira': '12',
      'Jade': '13'
    };
    return lineNumbers[lineName] || '?';
  };

  const getLineColor = (lineName) => {
    const lineColors = {
      'Rubi': '#9B101F',
      'Turquesa': '#41E1D0',
      'Coral': '#FE7F51',
      'Safira': '#810081',
      'Jade': '#01A86A'
    };
    return lineColors[lineName] || '#800080';
  };

  const verificarLoginERedirecionarAjuda = () => {
    if (!isLoggedIn) {
      setShowPopup({
        show: true,
        type: 'ajuda',
        message: 'Para acionar ajuda você precisa estar logado. Deseja fazer login agora?'
      });
    } else {
      navigation.navigate('Ajuda');
    }
  };

  const verificarLoginERedirecionarFeedback = () => {
    if (!isLoggedIn) {
      setShowPopup({
        show: true,
        type: 'feedback',
        message: 'Para enviar feedback você precisa estar logado. Deseja fazer login agora?'
      });
    } else {
      navigation.navigate('Feedback');
    }
  };

  const handleUserClick = () => {
    if (isLoggedIn) {
      navigation.navigate('User');
    } else {
      navigation.navigate('Login');
    }
  };

  const handleNavigation = (page) => {
    navigation.navigate(page);
  };

  const closePopup = () => {
    setShowPopup({ show: false, type: '', message: '' });
  };

  const goToLogin = async () => {
    closePopup();
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
    } catch (error) {
      console.log('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Erro ao fazer login');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#EE3338" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
              source={require('../../assets/images/cptm.png')} 
              style={styles.logoCPTM}
              resizeMode="contain"
            />
        </View>
        <TouchableOpacity style={styles.userButton} onPress={handleUserClick}>
          <View style={styles.userIconPlaceholder}>
            <Image 
              source={require('../../assets/images/user.png')} 
              style={styles.userIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Banner de notificações */}
        <View style={styles.notificationBanner}>
          <ScrollView
            ref={notificationScrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(event.nativeEvent.contentOffset.x / (width - 30));
              setCurrentNotificationIndex(newIndex);
            }}
          >
            {notifications && notifications.length > 0 ? (
              notifications.map((notificacao, index) => (
                <View
                  key={index}
                  style={[
                    styles.notificationItem,
                    { backgroundColor: getLineColor(notificacao.linha.nome) }
                  ]}
                >
                  <View style={styles.circleNumber}>
                    <Text style={styles.circleNumberText}>
                      {getLineNumber(notificacao.linha.nome)}
                    </Text>
                  </View>
                  <View style={styles.notificationTextContainer}>
                    <Text style={styles.notificationContent} numberOfLines={2}>
                      {notificacao.titulo} - {notificacao.texto}
                    </Text>
                    <Text style={styles.notificationDate}>
                      {formatDate(notificacao.dataEnvio)}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={[styles.notificationItem, styles.noNotifications]}>
                <Image 
                  source={require('../../assets/images/siren.png')} 
                  style={styles.notificationIcon}
                  resizeMode="contain"
                />
                <View style={styles.notificationTextContainer}>
                  <Text style={styles.notificationContent}>
                    Nenhuma notificação no momento
                  </Text>
                  <Text style={styles.notificationSubtitle}>
                    Fique tranquilo, você será notificado!
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>
          
          {/* Indicadores de página */}
          {notifications.length > 1 && (
            <View style={styles.pageIndicators}>
              {notifications.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.pageIndicator,
                    currentNotificationIndex === index && styles.activePageIndicator
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        {/* Funcionalidades */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Funcionalidades</Text>
          <View style={styles.featuresGrid}>
            <TouchableOpacity 
              style={styles.featureCard}
              onPress={() => handleNavigation('Estações')}
              activeOpacity={0.7}
            >
              <Image 
                source={require('../../assets/images/location-pin.png')} 
                style={styles.featureIcon}
                resizeMode="contain"
              />
              <Text style={styles.featureText}>Verificar{'\n'}Estações</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.featureCard}
              onPress={verificarLoginERedirecionarAjuda}
              activeOpacity={0.7}
            >
              <Image 
                source={require('../../assets/images/siren.png')} 
                style={styles.featureIcon}
                resizeMode="contain"
              />
              <Text style={styles.featureText}>Acionar{'\n'}Ajuda</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.featureCard}
              onPress={() => handleNavigation('Rastreamento')}
              activeOpacity={0.7}
            >
              <Image 
                source={require('../../assets/images/trem.png')} 
                style={styles.featureIcon}
                resizeMode="contain"
              />
              <Text style={styles.featureText}>Rastrear{'\n'}Trens</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.featureCard}
              onPress={verificarLoginERedirecionarFeedback}
              activeOpacity={0.7}
            >
              <Image 
                source={require('../../assets/images/feedback.png')} 
                style={styles.featureIcon}
                resizeMode="contain"
              />
              <Text style={styles.featureText}>Enviar{'\n'}Feedback</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card de atendimento */}
        <TouchableOpacity 
          style={styles.ctaCard} 
          activeOpacity={0.8}
          onPress={() => handleNavigation('Central de Atendimento')}
        >
          <View style={styles.ctaContent}>
            <Text style={styles.ctaText}>
              Central de Atendimento ao Passageiro
            </Text>
            <Text style={styles.ctaSubtext}>
              Fale conosco e nos ajude a melhorar!
            </Text>
          </View>
          <Image 
            source={require('../../assets/images/support.png')} 
            style={styles.ctaIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Card promocional */}
        <View style={styles.promoCard}>
          <View style={styles.promoImagePlaceholder}>
            <Image 
              source={require('../../assets/images/cptm2.png')} 
              style={styles.promoImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Conecte-se com a CPTM do Futuro</Text>
            <Text style={styles.promoText}>
              Faça login e salve suas preferências, receba alertas sobre suas rotas!
            </Text>
            <TouchableOpacity 
              style={styles.promoCTA}
              onPress={() => handleNavigation('Cadastro')}
              activeOpacity={0.8}
            >
              <Text style={styles.promoCTAText}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => handleNavigation('Home')}
          activeOpacity={0.7}
        >
          <Image 
            source={require('../../assets/images/homeIcon.png')} 
            style={styles.navIcon}
            resizeMode="contain"
          />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => handleNavigation('Estações')}
          activeOpacity={0.7}
        >
          <Image 
            source={require('../../assets/images/location-pin.png')} 
            style={styles.navIcon}
            resizeMode="contain"
          />
          <Text style={styles.navLabel}>Estações</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => handleNavigation("Rastreamento")}
          activeOpacity={0.7}
        >
          <Image 
            source={require('../../assets/images/trem.png')} 
            style={styles.navIcon}
            resizeMode="contain"
          />
          <Text style={styles.navLabel}>Trens</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navButton}
          onPress={verificarLoginERedirecionarAjuda}
          activeOpacity={0.7}
        >
          <Image 
            source={require('../../assets/images/siren.png')} 
            style={styles.navIcon}
            resizeMode="contain"
          />
          <Text style={styles.navLabel}>Ajuda</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de popup */}
      <Modal
        visible={showPopup.show}
        transparent={true}
        animationType="slide"
        onRequestClose={closePopup}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIcon}>
              <Text style={styles.modalIconText}>⚠️</Text>
            </View>
            <Text style={styles.modalTitle}>Login Necessário</Text>
            <Text style={styles.modalMessage}>{showPopup.message}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonPrimary]} 
                onPress={goToLogin}
                activeOpacity={0.8}
              >
                <Text style={styles.modalButtonTextPrimary}>Fazer Login</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonSecondary]} 
                onPress={closePopup}
                activeOpacity={0.8}
              >
                <Text style={styles.modalButtonTextSecondary}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#EE3338',
    height: isIOS ? 100 : 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: isIOS ? 10 : 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  logoCPTM: {
  width: 70, 
  height: 70,
  marginLeft: 60,
},
  userButton: {
    padding: 5,
  },
  userIconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 100,
  },
  notificationBanner: {
    height: 140,
    marginBottom: 30,
    position: 'relative',
  },
  notificationItem: {
    width: width - 30,
    height: 140,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  noNotifications: {
    backgroundColor: '#EE3338',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleNumber: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  circleNumberText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationContent: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
    lineHeight: 22,
  },
  notificationDate: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    tintColor: '#fff',
  },
  notificationSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 18,
  },
  pageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  pageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 4,
  },
  activePageIndicator: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    width: 20,
  },
  featuresSection: {
    marginBottom: 30,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: '#EE3338',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: (width - 45) / 2,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  featureIcon: {
    width: 32,
    height: 32,
    marginBottom: 8,
    tintColor: '#000',
  },
  featureText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    lineHeight: 16,
  },
  ctaCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: '#EE3338',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  ctaContent: {
    flex: 1,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  ctaSubtext: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  ctaIcon: {
    width: 32,
    height: 32,
    marginLeft: 15,
    tintColor: '#EE3338',
  },
  promoCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  promoImagePlaceholder: {
    height: 120,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoImage: {
    width: '100%',
    height: '100%',
  },
  promoContent: {
    padding: 20,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  promoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  promoCTA: {
    backgroundColor: '#EE3338',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignSelf: 'center',
  },
  promoCTAText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingBottom: isIOS ? 20 : 0,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  navButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    tintColor: '#666',
  },
  navLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  modalIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff9800',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalIconText: {
    fontSize: 28,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonPrimary: {
    backgroundColor: '#EE3338',
  },
  modalButtonSecondary: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modalButtonTextPrimary: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalButtonTextSecondary: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomePage;