import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import type { ThreadType } from 'app/types/Thread';
import { MARGINS, COLORS } from 'app/constants/design';
import moment from 'moment';

const styles = StyleSheet.create({
  threadContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    borderBottomWidth: 1,
    borderColor: COLORS.GREY,
    flexDirection: 'row',
    padding: MARGINS.SMALL,
  },
  threadHeader: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: MARGINS.TINY,
  },
  threadMatchProfile: {
    backgroundColor: COLORS.GREY_DARK,
    borderRadius: 30,
    height: 60,
    margin: MARGINS.SMALL,
    width: 60,
  },
  threadProfile: {
    backgroundColor: COLORS.GREY_DARK,
    borderRadius: 20,
    height: 40,
    marginRight: MARGINS.SMALL,
    width: 40,
  },
  threadsContainer: {
    flex: 1,
  },
  threadsMatchContainer: {
    borderBottomWidth: 1,
    borderColor: COLORS.GREY,
    flexDirection: 'row',
  },
});

type ThreadProps = {
  thread: ThreadType,
};

const Thread = (props: ThreadProps) => (
  <View style={styles.threadContainer}>
    <Image style={styles.threadProfile} source={{ uri: props.thread.user2.picture }} />
    <View style={{ flex: 1 }}>
      <View style={styles.threadHeader}>
        <Text>{props.thread.user2.name}</Text>
        <Text style={{ flex: 1, textAlign: 'right' }}>
          {moment(props.thread.createdAt).fromNow()}
        </Text>
      </View>
      <Text>{props.thread.lastMessage.message}</Text>
    </View>
  </View>
);

type ThreadMatchProps = {
  thread: ThreadType,
};

const ThreadMatch = (props: ThreadMatchProps) => (
  <Image style={styles.threadMatchProfile} source={{ uri: props.thread.user2.picture }} />
);

type ThreadsProps = {
  threads: Array<ThreadType>,
  onSelectThread: (string) => {}, //eslint-disable-line
};

const Threads = (props: ThreadsProps) => (
  <View style={styles.threadsContainer}>
    <ScrollView horizontal style={styles.threadsMatchContainer}>
      {props.threads.map((thread) =>
        (
          thread.lastMessage.match.data[0] ?
            <TouchableOpacity onPress={() => props.onSelectThread(thread.id)}>
              <ThreadMatch key={thread.id} thread={thread} />
            </TouchableOpacity>
            : null
        ))
      }
    </ScrollView>
    <View style={styles.threadsContainer}>
      {props.threads.map((thread) =>
        (
          !thread.lastMessage.match.data[0] ?
            <TouchableOpacity onPress={() => props.onSelectThread(thread.id)}>
              <Thread key={thread.id} thread={thread} />
            </TouchableOpacity>
            : null
        ))
      }
    </View>
  </View>
);

export default Threads;
export { Threads, Thread, ThreadMatch };
