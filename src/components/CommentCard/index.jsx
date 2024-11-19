import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale } from '../../functions/scale';

const { width } = Dimensions.get('window');

const CommentCard = ({ comment, isAdmin, onDelete }) => {
  const { autor, dataComentario, texto, autorUID } = comment;

  const handleDelete = () => {
    onDelete(comment.id);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.author}>{autor}</Text>
      <Text style={styles.date}>{dataComentario}</Text>
      <Text style={styles.text}>{texto}</Text>
      {(isAdmin || autorUID === comment.autorUID) && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Excluir</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width - 40, // largura da tela menos margens
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 8,
    borderRadius: 4,
    width: scale(96),
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CommentCard;
