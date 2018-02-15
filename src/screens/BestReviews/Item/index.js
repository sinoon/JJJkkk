
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import classes from './classes';
import randomeAvatar from 'utils/randomeAvatar';
import FadeImage from 'ui/FadeImage';
import Rate from 'ui/Rate';

export default class Item extends Component {
    static propTypes = {
        cover: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired,
        trailler: PropTypes.object.isRequired,
        stars: PropTypes.array.isRequired,
        tags: PropTypes.array.isRequired,
        reviews: PropTypes.array.isRequired,
    };

    renderPreviews() {
        var { previews } = this.props;

        return previews.slice(0, 4).map((e, index) => {
            if (index === 3) {
                return (
                    <FadeImage
                        {...{
                            resizeMode: 'cover',
                            key: index,
                            source: {
                                uri: e,
                            },
                            style: classes.preview,
                        }}
                    >
                        <View style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, .6)',
                            zIndex: 1,
                        }}>
                            <Text style={classes.morePreview}>
                                {previews.length > 9 ? '9+' : previews.length}
                            </Text>
                        </View>
                    </FadeImage>
                );
            }

            return (
                <FadeImage
                    {...{
                        key: index,
                        source: {
                            uri: e,
                        },
                        style: classes.preview,
                    }}
                />
            );
        });
    }

    renderStars() {
        var { stars } = this.props;

        return stars.slice(0, 3).map((e, index) => {
            return (
                <TouchableOpacity key={index}>
                    <FadeImage
                        {...{
                            showLoading: true,
                            resizeMode: 'cover',
                            source: {
                                uri: e.image || randomeAvatar(),
                            },
                            style: classes.star,
                        }}
                    >
                        <LinearGradient
                            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
                            style={classes.starMask}
                        >
                            <Text style={classes.starName}>{e.name}</Text>
                        </LinearGradient>
                    </FadeImage>
                </TouchableOpacity>
            );
        });
    }

    renderTags() {
        var { tags } = this.props;

        return tags.map((e, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    style={classes.tag}
                >
                    <Text style={classes.tagName}>{e.name}</Text>
                </TouchableOpacity>
            );
        });
    }

    renderReviews() {
        var { reviews } = this.props;

        return reviews.map((e, index) => {
            return (
                <View
                    key={index}
                    style={classes.review}
                >
                    <Text style={classes.reviewContent}>{e.content}</Text>
                    <View style={{
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                    }}>
                        <View style={classes.reviewMeta}>
                            <Text style={classes.reviewMetaText}>{moment(e.date).fromNow()} | {e.username}</Text>
                        </View>
                    </View>
                </View>
            );
        });
    }

    render() {
        var { cover, title, date, rate, text, stars, trailler, onScroll } = this.props;

        return (
            <ScrollView
                scrollEventThrottle={16}
                style={classes.container}
                onScroll={e => onScroll(e)}
            >
                <View style={classes.hero}>
                    <FadeImage
                        {...{
                            showLoading: true,
                            source: {
                                uri: cover,
                            },
                            style: classes.background,
                            offset: [
                                {
                                    translateX: -215,
                                }
                            ]
                        }}
                    />

                    <View style={classes.mask}>
                        <View style={classes.text}>
                            <Text
                                style={classes.title}
                                ellipsizeMode="tail"
                                numberOfLines={3}
                            >
                                {title.toUpperCase()}
                            </Text>

                            <View style={classes.line} />

                            <Text
                                style={classes.bestreview}
                                ellipsizeMode="tail"
                                numberOfLines={4}
                            >
                                {text}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={classes.body}>
                    <Text style={classes.header}>{title}</Text>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Text style={classes.meta}>{new Date(date).getFullYear()} | 1HOUR 58MIN</Text>

                        <Rate rate={rate} />
                    </View>

                    <View style={classes.videoAndPhoto}>
                        <Text style={classes.subheader}>Video and Photo</Text>
                        <FadeImage
                            {...{
                                resizeMode: 'cover',
                                source: {
                                    uri: trailler.cover || cover,
                                },
                                style: classes.traillerCover,
                            }}
                        >
                            <TouchableOpacity style={classes.playTrailler}>
                                <Icon name="ios-play" size={14} color="#000" />
                            </TouchableOpacity>
                        </FadeImage>
                        <View style={classes.previews}>
                            {
                                this.renderPreviews()
                            }
                        </View>

                        <TouchableOpacity
                            style={classes.watchButton}
                        >
                            <Text style={classes.watchText}>
                                WATCH NOW
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        display: stars.length === 0 ? 'none' : 'flex',
                    }}>
                        <Text style={classes.subheader}>Stars</Text>
                        <View style={classes.stars}>
                            {
                                this.renderStars()
                            }
                        </View>
                    </View>

                    <View>
                        <Text style={classes.subheader}>Tags</Text>
                        <View style={classes.tags}>
                            {
                                this.renderTags()
                            }
                        </View>
                    </View>

                    <View>
                        <Text style={classes.subheader}>Reviews</Text>
                        <View style={classes.reviews}>
                            {
                                this.renderReviews()
                            }
                        </View>
                    </View>
                </View>

                <View style={classes.footer}>
                    <Image {...{
                        source: require('images/logo.png'),
                        style: {
                            height: 32,
                            width: 32,
                        },
                    }} />
                </View>
            </ScrollView>
        );
    }
}