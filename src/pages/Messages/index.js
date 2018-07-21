import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';
import Layout from 'app/components/Layout/Basic';
import Threads from 'app/components/Threads';
import { onLoadThreads } from 'app/pages/Messages/actions';
import { selectThreads } from 'app/pages/Messages/selector';
import type { Thread } from 'app/types/Thread';
import { COLORS, MARGINS } from 'app/constants/design';

const styles = StyleSheet.create({
  mainPanel: {
    backgroundColor: COLORS.BACKGROUND,
    flex: 1,
    margin: MARGINS.TINY,
  },
});

type Props = {
  threads: Array<Thread>,
};

class Messages extends Component<Props> {
  componentWillMount() {
    this.props.onLoadThreads();
  }

  render() {
    return (
      <Layout>
        <ScrollView style={styles.mainPanel}>
          <Threads threads={this.props.threads} />
        </ScrollView>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  threads: selectThreads(state),
});

const mapDispatchToProps = {
  onLoadThreads,
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
export { Messages };
